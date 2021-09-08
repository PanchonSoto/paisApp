import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country
  translations!: string[]

  constructor(private actRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {

    this.actRoute.params
      .pipe(
        switchMap(({ id })=> this.paisService.getPaisId( id )),
        tap(console.log)
      )
      .subscribe(pais=>{
        this.pais = pais;
        this.translations = Object.values( pais.translations );
      });

    /* this.actRoute.params
      .subscribe(( {id} )=>{
        console.log(id);
        this.paisService.getPaisId(id)
          .subscribe(pais=>{
            console.log(pais);
          })
      }); */
  }

}
