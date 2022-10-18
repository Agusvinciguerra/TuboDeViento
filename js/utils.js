import Memberships from './memberships.js';

export default class Utils {
    constructor(){
        this.memeberships = new Memberships();
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw(data){
        
        const ball = document.getElementById('ball');
        ball.style.top = data.y+'px';
        ball.style.left = `calc(50% + ${data.x}px)`;
        
    }

    fuzzification(data){
        let distancia = data.objY - data.posY;

        let centrado = this.memeberships.triangle(distancia, -80, 0, 80);
        let cercaA = this.memeberships.grade(distancia, 20, -20);
        let normalA = this.memeberships.triangle(distancia, 800, 330, 80);
        let lejosA = this.memeberships.grade(distancia, 240, 300);

        let cercaB = this.memeberships.trapezoid(distancia, -180, -120, -80, -20);
        let normalB = this.memeberships.trapezoid(distancia, -280, -240, -160, -120);
        let lejosB = this.memeberships.gradeInverted(distancia, -300, -240);

        const numerador = centrado*9.8 + cercaA*4 + normalA*2 + lejosA*1 + cercaB*14 + normalB*15.5 + lejosB*18;
        const denominador = centrado+cercaA+normalA+lejosA+cercaB+normalB+lejosB;
        data.ventilador = numerador/denominador;
        return data;
    }
}