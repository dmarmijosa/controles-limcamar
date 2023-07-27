import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.css'],
})
export class FinComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') myDiv!: ElementRef;
  intervalId!: any;
  ngAfterViewInit() {
    const rect = this.myDiv.nativeElement.getBoundingClientRect();
    const event = {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    };

    const totalAnimationTime = 5000;

    // Define con qué frecuencia quieres que se repita la animación (en milisegundos)
    const repeatEvery = 1000;
  
    const intervalId = setInterval(() => {
      this.explode(event);
    }, repeatEvery);
  
    setTimeout(() => {
      clearInterval(intervalId);
    }, totalAnimationTime);
    //this.explode(event);
  }

  explode(event: any) {
    for (let i = 0; i < 50; i++) {
      this.createParticle(event);
    }
  }

  createParticle(event: any) {
    const particle = document.createElement('div');
    document.body.appendChild(particle);

    var size = Math.random() * 5 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    particle.style.position = 'absolute';
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    var destinationX = (Math.random() - 0.5) * 2 * 500;
    var destinationY = (Math.random() - 0.5) * 2 * 500;

    var animation = particle.animate(
      [
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 5000,
        easing: 'ease-out',
        fill: 'both',
      }
    );

    animation.onfinish = () => {
      particle.remove();
    };
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
