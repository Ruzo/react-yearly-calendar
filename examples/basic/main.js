const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');
const {Calendar, CalendarControls} = require('react-yearly-calendar');

class Demo extends React.Component {
  constructor(props) {
    super(props);

    var today = moment();

    this.state = {
      year: today.year(),
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day') ],
      showDaysOfWeek: true,
      showTodayBtn: true,
      showWeekSeparators: true,
      selectRange: false,
      firstDayOfWeek: 0 // sunday
    };
  }

  onPrevYear() {
    this.setState({ year: this.state.year-1 });
  }

  onNextYear() {
    this.setState({ year: this.state.year+1 });
  }

  goToToday() {
    var today = moment();

    this.setState({
      selectedDay: today,
      selectedRange: [today, moment(today).add(15, 'day') ],
      year: today.year()
    });
  }

  datePicked(date) {
    this.setState({
      selectedDay: date,
      selectedRange: [date, moment(date).add(15, 'day') ],
     });
  }

  rangePicked(start, end) {
    this.setState({
      selectedRange: [ start, end ],
      selectedDay: start
    });
  }

  toggleShowDaysOfWeek() {
    this.setState({ showDaysOfWeek: !this.state.showDaysOfWeek });
  }

  toggleForceFullWeeks(){
    var next_forceFullWeeks = !this.state.forceFullWeeks;
    this.setState({
      showDaysOfWeek: true,
      forceFullWeeks: next_forceFullWeeks
    });
  }

  toggleShowTodayBtn() {
    this.setState({ showTodayBtn: !this.state.showTodayBtn });
  }

  toggleShowWeekSeparators() {
    this.setState({ showWeekSeparators: !this.state.showWeekSeparators });
  }

  toggleSelectRange() {
    this.setState({ selectRange: !this.state.selectRange });
  }

  selectFirstDayOfWeek(e) {
    this.setState({ firstDayOfWeek: parseInt(event.target.value) });
  }

  render() {
    var { year, showTodayBtn, selectedDay, showDaysOfWeek, forceFullWeeks, showWeekSeparators, firstDayOfWeek, selectRange, selectedRange } = this.state;

    return (
      <div>
        <div id='calendar'>
          <CalendarControls
            year={year}
            showTodayButton={showTodayBtn}
            onPrevYear={() => this.onPrevYear()}
            onNextYear={() => this.onNextYear()}
            goToToday={() => this.goToToday()}
          />
          <Calendar
            year={year}
            selectedDay={selectedDay}
            showDaysOfWeek={showDaysOfWeek}
            forceFullWeeks={forceFullWeeks}
            showWeekSeparators={showWeekSeparators}
            firstDayOfWeek={firstDayOfWeek}
            selectRange={selectRange}
            selectedRange={selectedRange}
            onPickDate={(date) => this.datePicked(date)}
            onPickRange={(start, end) => this.rangePicked(start, end)}
          />
        </div>

        <h5>Proudly brought to you by <a href="http://belka.us/en">Belka</a></h5>

        <div className='options'>
          <b>Demo Options</b>
          <br />
          <ul>
            <li>
              <input
                id='showDaysOfWeek'
                type='checkbox'
                checked={showDaysOfWeek}
                onChange={() => this.toggleShowDaysOfWeek()}
              />
              <label htmlFor='showDaysOfWeek'>Show days of week</label>
            </li>
            <li>
              <input
                id='forceFullWeeks'
                type='checkbox'
                checked={forceFullWeeks}
                onChange={() => this.toggleForceFullWeeks()}
              />
              <label htmlFor='forceFullWeeks'>Force full weeks</label>
            </li>
            <li>
              <input
                id='showTodayBtn'
                type='checkbox'
                checked={showTodayBtn}
                onChange={() => this.toggleShowTodayBtn()}
              />
              <label htmlFor='showTodayBtn'>Show 'Today' button</label>
            </li>
            <li>
              <input
                id='showWeekSeparators'
                type='checkbox'
                checked={showWeekSeparators}
                onChange={() => this.toggleShowWeekSeparators()}
              />
            <label htmlFor='showWeekSeparators'>Show week separators</label>
            </li>
            <li>
              <label htmlFor='firstDayOfWeek'>First day of week</label>
              <select
                id='firstDayOfWeek'
                value={firstDayOfWeek}
                onChange={(e) => this.selectFirstDayOfWeek(e)}
              >
                {[0,1,2,3,4,5,6].map( i =>
                  <option key={i} value={i}>{moment().weekday(i).format("ddd")}</option>
                )}
              </select>
            </li>
            <li>
              <input
                id='selectRange'
                type='checkbox'
                checked={selectRange}
                onChange={() => this.toggleSelectRange()}
              />
              <label htmlFor='selectRange'>Select Date range</label>
            </li>
          </ul>
          <br />
          <i>All these options are available as Calendar props.</i>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
