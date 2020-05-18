import * as React from 'react';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

const data = [
  { region: 'Oceania', val: 64 },
  { region: 'Europe', val: 64 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
        <Chart
          data={chartData}
          style={{margin:'-100px 0'}}
        >
          <PieSeries
            valueField="val"
            argumentField="region"
            innerRadius={0.6}
          />
          <Animation />
        </Chart>
    );
  }
}
