import { Component, HostListener, Renderer2 } from '@angular/core';
import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],

})
export class AppComponent {
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }
  contador = 0;
  indexValidosPrimeiraFileira = [0, 3, 6, 9, 12, 15, 18,  21,24,27,30,33,36,39];
  indexValidosSegundaFileira = [1, 4, 7, 10, 13, 16, 19,   22,25,28,31,34,37, 40];
  indexValidosTerceiraFileira = [2, 5, 8, 11, 14, 17, 20,  23,26,29,32,35,38, 41];
  clubsNipe = 'clubs'
  heartsNipe = 'hearts'
  diamsNipe = 'diams'
  spadeNipe = 'spades'
  cards: any[] = []
  cardsVisible = [
    { textoCards: '2', name: this.clubsNipe },
    { textoCards: '2', name: this.heartsNipe },
    { textoCards: '2', name: this.diamsNipe },
    { textoCards: '4', name: this.clubsNipe },
    { textoCards: '4', name: this.heartsNipe },
    { textoCards: '4', name: this.diamsNipe },
    { textoCards: '5', name: this.clubsNipe },
    { textoCards: '5', name: this.heartsNipe },
    { textoCards: '5', name: this.diamsNipe },
    { textoCards: '6', name: this.clubsNipe },
    { textoCards: '6', name: this.heartsNipe },
    { textoCards: '6', name: this.diamsNipe },
    { textoCards: '7', name: this.clubsNipe },
    { textoCards: '7', name: this.heartsNipe },
    { textoCards: '7', name: this.diamsNipe },
    { textoCards: '8', name: this.clubsNipe },
    { textoCards: '8', name: this.heartsNipe },
    { textoCards: '8', name: this.diamsNipe },
    { textoCards: '9', name: this.clubsNipe },
    { textoCards: '9', name: this.heartsNipe },
    { textoCards: '9', name: this.diamsNipe },
    { textoCards: 'J', name: this.clubsNipe },
    { textoCards: 'A', name: this.heartsNipe },
    { textoCards: 'K', name: this.clubsNipe },
    { textoCards: 'J', name: this.clubsNipe },
    { textoCards: 'A', name: this.heartsNipe },
    { textoCards: 'K', name: this.diamsNipe },
    { textoCards: 'J', name: this.clubsNipe },
    { textoCards: 'A', name: this.heartsNipe },
    { textoCards: 'K', name: this.heartsNipe },
    { textoCards: 'J', name: this.clubsNipe },
    { textoCards: 'A', name: this.heartsNipe },
    { textoCards: 'K', name: this.spadeNipe },
    { textoCards: 'Q', name: this.clubsNipe },
    { textoCards: '2', name: this.spadeNipe },
    { textoCards: '5', name: this.spadeNipe },
    { textoCards: 'Q', name: this.spadeNipe },
    { textoCards: '4', name: this.spadeNipe },
    { textoCards: '7', name: this.spadeNipe },
    { textoCards: 'Q', name: this.heartsNipe },
    { textoCards: '6', name: this.spadeNipe },
    { textoCards: '8', name: this.spadeNipe }
  ];
  carta: { name: string; textoCards: string };
  constructor(private scroll: ViewportScroller,private renderer: Renderer2) {
    this.renderer.setStyle(document.body, 'background-color', '#453a77');
    this.shuffle(this.cardsVisible)
    this.cards = this.cardsVisible
  }
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
  getColorPlayingCard(ref:string){
    if(ref === 'hearts' || ref ==='diams'){
      return 'red'
    }else{
      return 'black'
    }
  }
  playAgain(){
    this.carta = null
    this.contador = 0
  }

  obterNumerosFileiraSugerida(list, fileira: string): any[] {
    return list.filter(item => this[fileira].includes(list.indexOf(item)));
  }
  descobrirCarta() {
    if (this.contador === 3) {
      console.log(this.cardsVisible)
      this.carta = this.cardsVisible[21];
    }
  }

  escolherFileira(position) {
    const primeira = () => {
      this.contador++;
      this.cardsVisible = [];
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosTerceiraFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosPrimeiraFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosSegundaFileira"
        ).reverse()
      );

      this.cards = this.cardsVisible;
      this.descobrirCarta();
    };
    const segunda = () => {
      this.contador++;
      this.cardsVisible = [];
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosPrimeiraFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosSegundaFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosTerceiraFileira"
        ).reverse()
      );
      this.cards = this.cardsVisible;
      this.descobrirCarta();
    };
    const terceira = () => {
      this.contador++;
      this.cardsVisible = [];
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosPrimeiraFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosTerceiraFileira"
        ).reverse()
      );
      this.cardsVisible = this.cardsVisible.concat(
        this.obterNumerosFileiraSugerida(
          this.cards,
          "indexValidosSegundaFileira"
        ).reverse()
      );

      this.cards = this.cardsVisible;
      this.descobrirCarta();
    };
    const filterMap = {
      1: primeira,
      2: segunda,
      3: terceira
    };
    if(!filterMap[position]()){
      return;
    }
    return filterMap[position]();
  }
}

