import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { Constant } from 'src/app/shared/constant/constant.component';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(Constant.Pattern.Form.Name), this.validateMaxDigits(50)]),
      country: new FormControl('', [Validators.required, Validators.pattern(Constant.Pattern.Form.Name), this.validateMaxDigits(30)]),
      founded: new FormControl('', [Validators.required, Validators.pattern(Constant.Pattern.Form.Phone), this.validateMaxDigits(4)]),
      logo: new FormControl('', [Validators.pattern(Constant.Pattern.Form.HTTP)]),
    })
  }

  ngOnInit() {
    this.setInformation()
  }

  setInformation() {
    this.form.controls['name'].setValue(this.navParams.get('team').name)
    this.form.controls['country'].setValue(this.navParams.get('team').country)
    this.form.controls['founded'].setValue(this.navParams.get('team').founded)
    this.form.controls['logo'].setValue(this.navParams.get('team').logo)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  checkName(control: any) {
    if (this.form.controls[control].value[0] === ' ') {
      this.form.controls[control].reset();
    }
  }

  checkFounded() {
    if (this.form.controls['founded'].value[0] === ' ') {
      this.form.controls['founded'].reset();
    }
  }

  checkLogo() {
    if (this.form.controls['logo'].value[0] === ' ') {
      this.form.controls['logo'].reset();
    }
  }

  validateMaxDigits(maxDigits: number) {
    return (control: { value: any; }) => {
      const value = control.value;
      if (value && value.toString().length > maxDigits) {
        return { maxDigitsExceeded: true };
      }
      return null;
    };
  }

  async updateTeam(form: any) {
    await loadingSpinner(this.loadingCtrl)

    let data = {
      name: form.name,
      country: form.country,
      founded: form.founded,
      logo: form.logo
    }

    this.authService.call(data, `updateTeam/${this.navParams.get('team').id}`, 'PATCH', true).subscribe({
      next: (response) => {
        if (response.status === Constant.SUCCESS) {
          this.loadingCtrl.dismiss()

          alertModal({
            title: 'Succes',
            text: 'Usuario actualizado exitosamente',
            button: [
              {
                cssClass: 'alert-button-confirm',
                text: 'Aceptar',
                handler: () => {
                  this.cancel()
                }
              }
            ],
            alertController: this.alertController
          })
        } else {
          this.loadingCtrl.dismiss()
          alertModal({
            title: 'Error',
            text: response.data,
            button: [
              {
                cssClass: 'alert-button-cancel',
                text: 'Cerrar',
              }
            ],
            alertController: this.alertController
          })
        }
      },
      error: (error) => {
        console.log(error)
        this.loadingCtrl.dismiss()

        alertModal({
          title: 'Error',
          text: 'Falla en el servidor',
          button: [
            {
              cssClass: 'alert-button-cancel',
              text: 'Cerrar',
            }
          ],
          alertController: this.alertController
        })
      }
    })
  }
}
