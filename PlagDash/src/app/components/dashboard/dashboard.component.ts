import {  Component,  OnInit} from '@angular/core';
import * as d3 from 'd3'
import {  AuthService} from '@auth0/auth0-angular';
import {  SharedService} from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';


import * as data from './sunburst.json'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public service: SharedService, public auth: AuthService) {
    this.view = [600, 357]
    this.gview = [600, 257]
    this.labelPie = "Total Assignments"
  }

  pieData: any = [];
  view: any = [];
  gview: any = [];


  // options for advanced pie
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  labelPie: any = ""

  // options for guage chart
  single: any[] = [];
  legend: boolean = true;
  legendPosition: string = 'right';
  legendTitle:string = "Courses"
  gaugeData:any = []


  colorScheme: any = {
    domain: (d3.schemeDark2).concat(d3.schemeCategory10)
  };


  proData: any = {}
  courseList: any = {}
  allAssgnData: any = {}
  barGraphData: any = {}
  assnCount: any = []
  svg: any;
  MARGIN = {
    LEFT: 100,
    RIGHT: 10,
    TOP: 10,
    BOTTOM: 130
  }
  WIDTH = 600 - this.MARGIN.LEFT - this.MARGIN.RIGHT
  HEIGHT = 400 - this.MARGIN.TOP - this.MARGIN.BOTTOM

  x: any = ""
  y: any = ""
  xaxis: any = ""

  multix: any = "";
  multiy: any = "";
  multiz: any = "";
  multisvg: any = "";
  multiLine: any = "";
  multiData: any = [];
  multiMapData: any = ""

  svg3: any = ""
  root: any = ""
  x3: any = ""
  y3: any = ""
  radius: any = ""
  arc: any = ""


  ngOnInit(): void {
    this.getProDetails()
  }

  getProDetails() {
    this.auth.user$.subscribe(
      (profile: any) => {
        this.service.getProfList().subscribe(data => {
          this.proData = data.filter(s => s.email == profile.email)[0]
          // console.log(this.proData)
          this.processAvgSimScores()
        })
      })


  }

  processAvgSimScores(): void {
    this.service.getAssgnList().subscribe(assgnList => {
      assgnList.forEach((assgn: any) => {
        var val = {
          params: {
            fileNames: ["./Files/Submissions" + "/" + assgn.courseId + "/" + assgn.assgnName],
            assgnName: assgn.assgnName
          }
        }
        this.service.getData(val).subscribe((data: any) => {
          assgn.avgSim = Number(data.avgSimScore).toFixed(2)
          this.service.updateAssgn(assgn).subscribe(res => {
            // console.log(res)
          })
        })
      })
      this.getAssnList()
    })
  }


  getAssnList() {
    this.service.getAssgnList().subscribe(res => {
      this.allAssgnData = res.filter(s => s.proId == this.proData.proId);
      this.allAssgnData.forEach((assgn: any) => {
        assgn.date = new Date(assgn.assgnCreated)
      })
      this.assnCount = res.length
      this.getCourseList()
    })
  }

  getCourseList() {
    this.service.getCourseList().subscribe(data => {
      this.courseList = data.filter(s => s.professorId == this.proData.proId);
      this.courseList.push({
        courseId: "All"
      })
      this.createSvsY()
    })
  }

  createSvsY(): void {
    this.generateData()
    this.barChart()
    this.multiLineChart()
    this.sunburst()
  }

  /* --------------------------------------------------------   Pie Chart ------------------------------------------*/

  generateData() {

    /* Data generation for pie chart and multi line chart*/

    var tempPieData: any = [];
    var tempGaugeData: any = [];

    this.courseList.forEach((course: any) => {
      var filteredData = this.allAssgnData.filter((x: any) => x.courseId == course.courseId && x.avgSim!=0)
      var piedata = this.allAssgnData.filter((x: any) => x.courseId == course.courseId)

      if (filteredData.length != 0) {
        var total=0
        this.multiData.push({
          id: course.courseId,
          values: filteredData
        })

        filteredData.forEach((fildata:any)=>{
          total = total + fildata.avgSim
        })

        tempGaugeData.push({
          "name": course.courseId,
          "value": total/filteredData.length
        })
      }


      if (piedata.length != 0) {
        tempPieData.push({
          "name": course.courseId,
          "value": piedata.length
        })
      }

    })


    this.multiMapData = [new Date("2022-08-01"), new Date()]
    this.pieData = tempPieData
    this.gaugeData = tempGaugeData
  }



  /* --------------------------------------------------------   Bar Chart ------------------------------------------*/

  barChart() {
    this.barGraphData = this.allAssgnData.filter((x:any)=> x.avgSim != 0)
    this.createSvg()
    this.drawBars(this.allAssgnData)
    this.courseSelect({
      courseId: "All"
    }, {
      isUserInput: true
    })
  }

  private createSvg(): void {
    this.svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", this.WIDTH + this.MARGIN.LEFT + this.MARGIN.RIGHT)
      .attr("height", this.HEIGHT + this.MARGIN.TOP + this.MARGIN.BOTTOM)
      .append("g")
      .attr("transform", "translate(" + this.MARGIN.LEFT + "," + this.MARGIN.TOP + ")");

    // X label
    this.svg.append("text")
      .attr("class", "x axis-label")
      .attr("x", this.WIDTH / 2)
      .attr("y", this.HEIGHT + 70)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Assignments")

    // Y label
    this.svg.append("text")
      .attr("class", "y axis-label")
      .attr("x", -(this.HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Similarity Score (Avg)")
  }



  private drawBars(data: any[]): void {
    // Create the X-axis band scale

    this.x = d3.scaleBand()
      .range([0, this.WIDTH])
      .domain(data.map(d => d.assgnName))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.xaxis = this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.HEIGHT + ")")

    // Create the Y-axis band scale
    this.y = d3.scaleLinear()
      .domain([0, 1])
      .range([this.HEIGHT, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(this.y));



  }

  // call this whenever the filter changes
  courseSelect(courseObj: any, event: any) {
    var data;
    if (event.isUserInput) {

      if (courseObj.courseId == "All") {
        data = this.barGraphData
      }
      // filter the data
      else {
        data = this.barGraphData.filter((x: any) => x.courseId == courseObj.courseId)

      }

      // update the bars
      this.x.domain(data.map((d: any) => d.assgnName))

      this.xaxis
        .transition().duration(1000)
        .call(d3.axisBottom(this.x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");


      // JOIN new data with old elements.
      const rects = this.svg.selectAll("rect")
        .data(data)

      // EXIT old elements not present in new data.
      rects.exit().remove()

      // UPDATE old elements present in new data.
      rects
        .transition().duration(1000)
        .attr("x", (d: {assgnName: string;}) => this.x(d.assgnName))
        .attr("y", (d: {avgSim: d3.NumberValue;}) => this.y(d.avgSim))
        .attr("width", this.x.bandwidth())
        .attr("height", (d: {avgSim: d3.NumberValue;}) => this.HEIGHT - this.y(d.avgSim))


      // ENTER new elements present in new data.
      rects.enter()
        .append("rect")
        // .transition().duration(1000)
        .attr("x", (d: {assgnName: string;}) => this.x(d.assgnName))
        .attr("y", (d: {avgSim: d3.NumberValue;}) => this.y(d.avgSim))
        .attr("width", this.x.bandwidth())
        .attr("height", (d: {avgSim: d3.NumberValue;}) => this.HEIGHT - this.y(d.avgSim))
        .attr("fill", "#d04a35")

    }
  }


  /* --------------------------------------------------------   Multi Line Chart ------------------------------------------*/

  multiLineChart() {
    this.createMultiSvg()
    this.initChart();
    this.drawMultiAxis();
    this.drawPath();
  }



  createMultiSvg() {
    this.multisvg = d3.select('#my_dataviz2')
      .append("svg")
      .attr("width", this.WIDTH + this.MARGIN.LEFT + this.MARGIN.RIGHT + 60)
      .attr("height", this.HEIGHT + this.MARGIN.TOP + this.MARGIN.BOTTOM)
      .append('g')
      .attr('transform', 'translate(' + this.MARGIN.LEFT + ',' + this.MARGIN.TOP + ')');

    // X label
    this.multisvg.append("text")
      .attr("class", "x axis-label")
      .attr("x", this.WIDTH / 2)
      .attr("y", this.HEIGHT + 60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Years")

    // Y label
    this.multisvg.append("text")
      .attr("class", "y axis-label")
      .attr("x", -(this.HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Similarity Score (Avg)")
  }

  private initChart(): void {

    this.multix = d3.scaleTime().range([0, this.WIDTH]);
    this.multiy = d3.scaleLinear().range([this.HEIGHT, 0]);
    this.multiz = d3.scaleOrdinal(d3.schemeCategory10);

    this.multiLine = d3.line()
      .curve(d3.curveBasis)
      .x((d: any) => this.multix(d.date))
      .y((d: any) => this.multiy(d.avgSim));

    this.multix.domain(d3.extent(this.multiMapData, (d: Date) => d));


    this.multiy.domain([0, 1]);

    this.multiz.domain(this.multiData.map(function (c: any) {
      return c.id;
    }));
  }

  private drawMultiAxis(): void {
    this.multisvg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.HEIGHT + ')')
      .call(d3.axisBottom(this.multix));

    this.multisvg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.multiy))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
  }

  private drawPath(): void {
    let city = this.multisvg.selectAll('.city')
      .data(this.multiData)
      .enter().append('g')
      .attr('class', 'city');

    city.append('path')
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr('d', (d: any) => this.multiLine(d.values))
      .style('stroke', (d: any) => this.multiz(d.id));

    city.append('text')
      .datum(function (d: any) {
        return {
          id: d.id,
          value: d.values[d.values.length - 1]
        };
      })
      .attr('transform', (d: any) => 'translate(' + this.multix(d.value.date) + ',' + this.multiy(d.value.avgSim) + ')')
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(function (d: any) {
        return d.id;
      });
  }

  sunburst() {
    this.root = data
    this.radius = (Math.min(this.WIDTH, this.HEIGHT) / 2) - 10;

    var formatNumber = d3.format(".3n");

    this.x3 = d3.scaleLinear()
      .range([0, 2 * Math.PI]);

    this.y3 = d3.scaleSqrt()
      .range([0, this.radius]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var partition = d3.partition();

    // These values will be provided by d3.partition()
    this.arc = d3.arc()
      .startAngle((d: any) => {
        return Math.max(0, Math.min(2 * Math.PI, this.x3(d.x0)));
      })
      .endAngle((d: any) => {
        return Math.max(0, Math.min(2 * Math.PI, this.x3(d.x1)));
      })
      .innerRadius((d: any) => {
        return Math.max(0, this.y3(d.y0));
      })
      .outerRadius((d: any) => {
        return Math.max(0, this.y3(d.y1));
      });


    this.svg3 = d3.select("#chart").append("svg")
      .attr("width", this.WIDTH + this.MARGIN.LEFT + this.MARGIN.RIGHT)
      .attr("height", this.HEIGHT + this.MARGIN.TOP + this.MARGIN.BOTTOM)
      .append('g')
      .attr('transform', 'translate(' + ((this.WIDTH + this.MARGIN.LEFT + 60) / 2) + ',' + this.HEIGHT / 2 + ')');


    this.root = d3.hierarchy(this.root)
      .sum((d) => {
        return d.size;
      });

    // Add an arc for each of the nodes in our hierarchy. partition(root) adds x0, x1, y0, and y1 values to each node.
    this.svg3.selectAll("path")
      .data(partition(this.root).descendants())
      .enter().append("path")
      .attr("d", this.arc)
      .style("fill", (d: any) => {
        return color((d.children ? d : d.parent).data.name);
      })
      .on("click", this.click.bind(this))

  }

  click(event: any, d: any) {
    // Redraw the arcs when one of them is clicked to zoom in on a section
    this.svg3.transition()
      .duration(750)
      .tween("scales", () => {
        var xd = d3.interpolate(this.x3.domain(), [d.x0, d.x1])
        var yd = d3.interpolate(this.y3.domain(), [d.y0, 1])
        var yr = d3.interpolate(this.y3.range(), [d.y0 ? 20 : 0, this.radius]);
        return (t: any) => {
          this.x3.domain(xd(t));
          this.y3.domain(yd(t)).range(yr(t));
        };
      })
      .selectAll("path")
      .attrTween("d", (d: any) => {
        return () => {
          return this.arc(d);
        };
      });

  }


}
