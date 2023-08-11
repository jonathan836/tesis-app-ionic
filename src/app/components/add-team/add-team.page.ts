import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';
import { alert } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  addTeamForm: FormGroup;
  allTeams: any = [];

  constructor(
    public form: FormBuilder,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
  ) {
    this.addTeamForm = this.form.group({
      teamName: new FormControl('', [Validators.required]),
      teamCountry: new FormControl('', [Validators.required]),
      teamFounded: new FormControl('', [Validators.required]),
      teamLogoUrl: new FormControl(''),
    })
  }

  ngOnInit() {
    this.getAllTeams()
  }


  async addTeam(form: any) {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      name: form.teamName,
      country: form.teamCountry,
      founded: form.teamFounded,
      logo: form.teamLogoUrl
    }

    this.authService.call(data, 'addTeam', 'POST', true).subscribe({
      next: async (response) => {
        if (response.status === 'SUCCESS') {
          this.loadingCtrl.dismiss();
          this.getAllTeams()
          alert({
            title: response.status,
            text: 'Equipo agregado exitosamente',
            button: ['Cerrar'],
            alertController: this.alertController
          })
        } else if (response.status === 'ERROR') {
          console.log(response);
          this.loadingCtrl.dismiss();

          alert({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }

  async getAllTeams() {
    await loadingSpinner(this.loadingCtrl)

    this.authService.call(null, 'getAllTeams', 'GET', true).subscribe({
      next: async (response) => {
        if (response.status === 'SUCCESS') {
          this.loadingCtrl.dismiss();

          this.allTeams = response.data
        } else if (response.status === 'ERROR') {
          console.log(response);
          this.loadingCtrl.dismiss();

          alert({
            title: response.status,
            text: response.data,
            button: ['Cerrar'],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error);
        this.loadingCtrl.dismiss();

        alert({
          title: 'Error',
          text: 'Falla en el servidor',
          button: ['Cerrar'],
          alertController: this.alertController
        })
      }
    })
  }
}
