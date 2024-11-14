import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})
export class LinechartComponent implements OnInit {
  public lineConfigs: any[] = [];

  ngOnInit(): void {
    
    this.lineConfigs = [
      this.createLineConfig('OXIGENO', [200, 576, 680], '#A8699F', 'semaforo1'),
      this.createLineConfig('TEMPERATURA', [333, 520, 800], '#FF336B', 'semaforo2'),
      this.createLineConfig('SALINIDAD', [300, 480, 660], '#3498DB', 'semaforo3'),
      this.createLineConfig('PH', [250, 440, 800], '#2ECC71', 'semaforo4'),
    ];

    this.lineConfigs.forEach((config, index) => {
      this.initializeChart(`MyLineChart${index + 1}`, config);
    });
  }

  createLineConfig(label: string, data: number[], color: string, semaforoId: string) {
    return {
      type: 'line',
      data: {
        labels: ['ENERO', 'JUNIO', 'DICIEMBRE'],
        datasets: [
          {
            label: label,
            data: data,
            fill: false,
            borderColor: color,
            tension: 0.1,
            borderWidth: 3,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        onClick: (event: any, elements: any) => {
          if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const dataIndex = elements[0].index;
            const value = data[dataIndex];
            this.updateSemaforo(semaforoId, value);
          }
        },
      },
    };
  }

  initializeChart(canvasId: string, config: any) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, config);
    } else {
      console.error(`Canvas con ID "${canvasId}" no encontrado.`);
    }
  }

  updateSemaforo(semaforoId: string, value: number): void {
    const redLight = document.getElementById(`${semaforoId}-red`) as HTMLElement;
    const yellowLight = document.getElementById(`${semaforoId}-yellow`) as HTMLElement;
    const greenLight = document.getElementById(`${semaforoId}-green`) as HTMLElement;
    const semaforoMessage = document.getElementById(`${semaforoId}-message`) as HTMLElement;

    if (redLight && yellowLight && greenLight && semaforoMessage) {
      redLight.style.backgroundColor = 'grey';
      yellowLight.style.backgroundColor = 'grey';
      greenLight.style.backgroundColor = 'grey';

      semaforoMessage.textContent = 'Estado del valor';

      if (value >= 600) {
        redLight.style.backgroundColor = 'red';
        semaforoMessage.textContent = 'Valor negativo';
      } else if (value >= 400) {
        yellowLight.style.backgroundColor = 'yellow';
        semaforoMessage.textContent = 'Valor regular';
      } else if (value >= 200) {
        greenLight.style.backgroundColor = 'green';
        semaforoMessage.textContent = 'Valor positivo';
      }
    } else {
      console.error('No se pudieron encontrar los elementos del semáforo');
    }
  }
}
