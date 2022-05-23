import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions1!: {};
  chartOptions2!:{};
  chartOptions3!:{};
  chartOptions4!:{};
  denumire! :[]
  culoare! :[]
  pret! :[]
  cantitate!:[]
  disponibilitate!: []

  constructor(private employeeService: EmployeeService) { }
  ngOnInit(): void {
    this.initData();
    this.chartOptions1 =  {
      chart: {
      type: 'pie'
  },
  title: {
      text: 'Statistici florarie - culori'
  },
  accessibility: {
      announceNewData: {
          enabled: true
      },
      point: {
          valueSuffix: '%'
      }
  },

  plotOptions: {
      series: {
          dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'
          }
      }
  },

  tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  series: [
      {
          name: "Culori",
          colorByPoint: true,
          data: [
              {
                  name: "Alb",
                  y: 40,
                  drilldown: "Alb"
              },
              {
                  name: "Rosu",
                  y: 20,
                  drilldown: "Rosu"
              },
              {
                  name: "Crem",
                  y: 20,
                  drilldown: "Crem"
              },
              {
                  name: "Albastru",
                  y: 20,
                  drilldown: "Albastru"
              },
              {
                name: "Verde",
                y: 0,
                drilldown: "Verde"
            }
          ]
      }
  ],
  drilldown: {
      series: [
          {
              name: "Alb",
              id: "Alb",
              data: [
                 "numar",
                 2
              ]
          },
          {
              name: "Rosu",
              id: "Rosu",
              data: [
                  "numar",
                  1
              ]
          },
          {
              name: "Crem",
              id: "Crem",
              data: [
                  "numar",
                  1
              ]
          },
          {
              name: "Albastru",
              id: "Albastru",
              data: [
                  "numar",
                  1
              ]
          }
          
      ]
  }
  }

  this.chartOptions2 =  {
    chart: {
    type: 'pie'
},
title: {
    text: 'Statistici florarie - disponibilitate'
},
accessibility: {
    announceNewData: {
        enabled: true
    },
    point: {
        valueSuffix: '%'
    }
},

plotOptions: {
    series: {
        dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.1f}%'
        }
    }
},

tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
},

series: [
    {
        name: "Disponibilitate",
        colorByPoint: true,
        data: [
            {
                name: "Disponibil",
                y: 90,
                drilldown: "Disponibil"
            },
            {
                name: "Indisponibil",
                y: 10,
                drilldown: "Indisponibil"
            }
        ]
    }
],
drilldown: {
    series: [
        {
            name: "Disponibil",
            id: "Disponibil",
            data: [
               "numar",
               2
            ]
        },
        {
            name: "Indisponibil",
            id: "Indisponibil",
            data: [
                "numar",
                1
            ]
        }
        
    ]
}
}

this.chartOptions3 =  {
  chart: {
  type: 'pie'
},
title: {
  text: 'Statistici florarie - Pret'
},
accessibility: {
  announceNewData: {
      enabled: true
  },
  point: {
      valueSuffix: '%'
  }
},

plotOptions: {
  series: {
      dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
      }
  }
},

tooltip: {
  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
},

series: [
  {
      name: "Pret",
      colorByPoint: true,
      data: [
          {
              name: "<10",
              y: 12,
              drilldown: "<10>"
          },
          {
              name: "10< x <25",
              y: 46.5,
              drilldown: "10< x <25"
          },
          {
              name: ">25",
              y: 30,
              drilldown: ">25"
          }
      ]
  }
],
drilldown: {
  series: [
      {
          name: "Disponibil",
          id: "Disponibil",
          data: [
             "numar",
             2
          ]
      },
      {
          name: "Indisponibil",
          id: "Indisponibil",
          data: [
              "numar",
              1
          ]
      }
      
  ]
}
}
this.chartOptions4 =  {
  chart: {
  type: 'pie'
},
title: {
  text: 'Statistici florarie - cantitate'
},
accessibility: {
  announceNewData: {
      enabled: true
  },
  point: {
      valueSuffix: '%'
  }
},

plotOptions: {
  series: {
      dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
      }
  }
},

tooltip: {
  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
},

series: [
  {
      name: "Cantitate",
      colorByPoint: true,
      data: [
          {
              name: "0",
              y: 10,
              drilldown: "Disponibil"
          },
          {
              name: "<10",
              y: 23,
          },
          {
              name: "10< x <30",
              y: 20,
          },
          {
              name: "30< x <100",
              y: 46,
          }
      ]
  }
]
}

}

initData() {
  this.employeeService.getAllFlowers('Buchetino').subscribe(res => {
    this.denumire = res.map((res: { denumire: any; }) => res.denumire);
    this.culoare = res.map((res: { culoare: any; }) => res.culoare);
    this.pret = res.map((res: { pret: any; }) => res.pret);
    this.cantitate = res.map((res: { cantitate: any; }) => res.cantitate);
    this.disponibilitate = res.map((res: { disponibilitate: any; }) => res.disponibilitate);

  })
}
}



