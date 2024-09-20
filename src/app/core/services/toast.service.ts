import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastType } from '../../utils/enums/toastType';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService: ToastrService) { }

  public message(title: string, message: string, toastType: ToastType){

    switch(toastType){
      case ToastType.INFO:
        this.toastService.info(title, message);
        break;
      case ToastType.ERROR:
        this.toastService.error(title, message);
        break;
      case ToastType.SUCCESS:
        this.toastService.success(title, message);
        break;
      case ToastType.WARNING:
        this.toastService.warning(title, message);
    }
  }
}
