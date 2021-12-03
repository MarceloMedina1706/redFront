import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  inThis: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output() sendShowFollowSection = new EventEmitter<boolean>();
  onShowFollowSection(): void{
    this.sendShowFollowSection.emit(true);
    this.inThis = true;
  }

  //@Output() sendUnShowFollowSection = new EventEmitter<boolean>();
  onUnShowFollowSection(): void{
    this.sendShowFollowSection.emit(false);
    this.inThis = false;
  }

}
