import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Employee } from '../Employee';
import * as jsPDF  from 'jspdf'

  	
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit{
  title = 'charts';
  url = 'http://localhost:4000/view';
  employees: Employee[];
  employee_name = [];
  lnd = [];
  pnd = [];
  eod = [];
  tc  = [];
  rt  = [];
  chart = [];
 
  constructor(private httpClient: HttpClient) {}
  
  generatePDF()
  {  

  	var canvas = document.querySelector('canvas') as HTMLCanvasElement;
	//creates image
	var canvasImg = canvas.toDataURL("image/png", 1.0);
  
	//creates PDF from img
	var doc = new jsPDF('landscape');
	doc.setFontSize(20);
	doc.text(15, 15, "Employee Performance Report");
	doc.addImage(canvasImg, 'PNG', 15, 30);
	doc.save('Employee Performance Report.pdf');
  }

   ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: Employee[]) => {
      	console.log(res);
      	res.forEach(y => {
        this.employee_name.push(y.employee_name);
        this.lnd.push(y.lnd);
        this.pnd.push(y.pnd);
        this.eod.push(y.eod);
        this.tc.push(y.tc);
        this.rt.push(y.rt);
      });

      var pndData = {
		  label: 'Punctuality and Discipline',
		  data: this.pnd,
		  backgroundColor: 'rgba(0, 99, 132, 0.7)',
		  borderWidth: 0,
		  yAxisID: "y-axis-pnd"
		};

		var lndData = {
		  label: 'Learning and Development',
		  data: this.lnd,
		  backgroundColor: 'rgba(255,183,71,0.7)',
		  borderWidth: 0
		};

		var eodData = {
		  label: 'Execution of Duties',
		  data: this.eod,
		  backgroundColor: 'rgba(153,255,102,0.7)',
		  borderWidth: 0
		};

		var tcData = {
		  label: 'Team Cooperation',
		  data: this.tc,
		  backgroundColor: 'rgba(102,0,0,0.7)',
		  borderWidth: 0
		};

		var rtData = {
		  label: 'Responsibility Taken',
		  data: this.rt,
		  backgroundColor: 'rgba(255,110,113,0.7)',
		  borderWidth: 0
		};

		var employeeData = {
		  labels: this.employee_name,
		  datasets: [lndData, pndData,eodData,tcData,rtData]
		};

      var chartOptions = {
	  scales: {
	    xAxes: [{
	      barPercentage: 1,
	      categoryPercentage: 0.6
	    }],
	    yAxes: [{
	      id: "y-axis-pnd",
	      ticks: {
	       			beginAtZero: true ,
        			min: 0,
        			max: 10
    			 }
	    }]
	  },
	  responsive: true,
	  maintainAspectRatio: false	  
	};

	this.chart = new Chart('canvas', {
	  type: 'bar',
	  data: employeeData,
	  options: chartOptions
	});

    });
  }
}