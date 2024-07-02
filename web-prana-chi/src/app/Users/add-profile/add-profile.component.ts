import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-profile.component.html',
  styleUrl: './add-profile.component.css'
})
export class AddProfileComponent {

  profileName: string = "" 
  @Output() profileEmiter = new EventEmitter<string>();

  sendMessage() {
    this.profileEmiter.emit(this.profileName);
  }
}
