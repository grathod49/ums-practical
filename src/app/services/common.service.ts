import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private toastr: ToastrService) { }

    // show success toastr
    showSuccessToastr(message: string, title: string = 'Success'): void {
        this.toastr.success(message, title);
    }

    // show error toastr
    showErrorToastr(message: string, title: string = 'Error'): void {
        this.toastr.error(message, title);
    }

    // show warning toastr
    showWarningToastr(message: string, title: string = 'Warning'): void {
        this.toastr.warning(message, title);
    }

}
