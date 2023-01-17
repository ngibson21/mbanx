<template>
  <div id="chart" />
</template>

<script>
import ApexCharts from 'apexcharts'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default {
  props: {
    currency: {
      type: String,
      required: true
    }
  },
  data () {
    const today = new Date()

    return {
      currentDate: today.getDate(),
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      totalDaysOfLastMonth: new Date(today.getFullYear(), today.getMonth(), 0).getDate(),
      chart: null,
      chartSettings: {
        chart: {
          type: 'area',
          toolbar: {
            show: false
          },
          stacked: false,
          height: 200,
          zoom: {
            enabled: false
          },
          animations: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: true,
          shared: true,
          y: {
            formatter: (value) => {
              return `${this.$n(value, {
                key: 'currency',
                currency: this.currency
              })}`
            }
          },
          x: {
            formatter: value => value
          }
        },
        grid: {
          padding: {
            left: 0,
            right: 0
          },
          show: false
        },
        legend: {
          fontSize: '14px',
          labels: {}
        },
        yaxis: {
          show: false,
          labels: {
            show: false
          }
        },
        xaxis: {
          labels: {
            style: {
              fontSize: '14px'
            },
            offsetY: -5,
            formatter: this.xAxisFormatter,
            rotate: 0,
            hideOverlappingLabels: false
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },
        markers: {},
        theme: {},
        stroke: {},
        series: [],
        colors: []
      }
    }
  },
  computed: {
    accounts () {
      return this.$store.getters['accounts/list']('savings')
    },
    dark () {
      return this.$store.state.localSettings.darkMode
    },
    transactions () {
      const accountIds = this.accounts.map(account => account.id)

      return this.$store.getters['transactions/list'](accountIds, 'savings')
    }
  },
  watch: {
    dark () {
      this.chart.updateOptions(this.updateChartSettings())
      // workaround with vuetify tab that make chart disappear when change theme
      this.recreateChart()
    },
    currency () {
      this.chart.updateOptions(this.updateChartSettings())
    },
    transactions () {
      this.chart.updateOptions(this.updateChartSettings())
    }
  },
  methods: {
    xAxisFormatter (value, timestamp) {
      dayjs.extend(customParseFormat)
      return dayjs(`${this.currentMonth + 1} ${value}`, 'M D').format('MMM D')
    },
    isSameDate (date1, date2) {
      return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    },
    getSeriesValues (graphLineReference, transactions, year, month) {
      // Modifying graphLineReference directly
      for (let day = (graphLineReference.length - 1); day > 0; day--) {
        const nextDayTx = transactions.filter(tx => {
          const txDate = new Date(tx.createdAt)
          return this.isSameDate(txDate, new Date(year, month, day + 1))
        })

        let nextDayTotalTx = 0
        nextDayTx.forEach(tx => {
          if (tx.account.currency.code === this.currency) {
            if (tx.hold) {
              nextDayTotalTx += tx.amount
            } else if (tx.typeOf === 1 || tx.typeOf === 3 || tx.typeOf === 8) {
              nextDayTotalTx -= tx.amount
            } else {
              nextDayTotalTx += tx.amount
            }
          }
        })
        graphLineReference[day - 1] = nextDayTotalTx + graphLineReference[day]
      }
    },
    getSeries () {
      const thisMonthData = Array.from({ length: this.currentDate }, (_, i) => 0)
      const lastMonthData = Array.from({ length: this.totalDaysOfLastMonth }, (_, i) => 0)

      thisMonthData[this.currentDate - 1] = this.$store.getters['accounts/getTotalAvailableBalanceByCurrency'](this.accounts)[this.currency]
      this.getSeriesValues(thisMonthData, this.transactions, this.currentYear, this.currentMonth)

      lastMonthData[this.totalDaysOfLastMonth - 1] = thisMonthData[0]
      this.getSeriesValues(lastMonthData, this.transactions, this.currentYear, this.currentMonth - 1)

      return [
        {
          name: this.$t('components.dashboard.intro.chart.thisMonth'),
          data: thisMonthData
        },
        {
          name: this.$t('components.dashboard.intro.chart.lastMonth'),
          data: lastMonthData
        }
      ]
    },
    updateChartSettings () {
      const mode = this.dark ? 'dark' : 'light'
      const { primary, quinary } = this.$vuetify.theme.themes[mode]
      const strokeColor = [primary, quinary]
      const chartColor = [primary, quinary]
      const xaxisColor = Array.from({ length: 31 }, (_, i) => {
        return (i === this.currentDate - 1) ? primary : 'transparent'
      })

      // Handle edge case for first day of the month. issue #529
      if (this.currentDate === 1) {
        Object.assign(this.chartSettings.xaxis, {
          type: 'numeric',
          min: 1,
          max: this.currentDate > this.totalDaysOfLastMonth ? this.currentDate : this.totalDaysOfLastMonth,
          tickAmount: this.currentDate > this.totalDaysOfLastMonth ? this.currentDate : this.totalDaysOfLastMonth
        })

        Object.assign(this.chartSettings.markers, {
          size: [5, 0],
          hover: {
            size: 5
          },
          discrete: [
            {
              seriesIndex: 0,
              dataPointIndex: 0,
              fillColor: primary,
              strokeColor: '#fff',
              size: 6
            }
          ]
        })
      } else {
        Object.assign(this.chartSettings.markers, {
          size: [0, 0],
          hover: {
            size: 5
          }
        })
      }

      Object.assign(this.chartSettings.xaxis.labels.style, { colors: xaxisColor })
      Object.assign(this.chartSettings.chart, { background: mode === 'dark' ? '#545760' : 'transparent' })
      Object.assign(this.chartSettings.theme, { mode })
      Object.assign(this.chartSettings.stroke, { colors: strokeColor })
      Object.assign(this.chartSettings.series, this.getSeries())
      Object.assign(this.chartSettings.colors, chartColor)
      Object.assign(this.chartSettings.legend.labels, { colors: mode === 'dark' ? '#fafafa' : '#404249' })

      return this.chartSettings
    },
    recreateChart () {
      this.chart.destroy()
      this.mountedChart()
    },
    mountedChart () {
      this.chart = new ApexCharts(document.querySelector('#chart'), this.updateChartSettings())

      // To make sure chart has been initialize
      this.$nextTick(() => {
        this.chart.render()
      })
    }
  },
  mounted () {
    this.mountedChart()
  },
  beforeDestroy () {
    this.chart.destroy()
  }
}
</script>
