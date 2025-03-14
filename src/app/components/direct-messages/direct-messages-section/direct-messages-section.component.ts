import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/shared/services/chat.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-direct-messages-section',
  templateUrl: './direct-messages-section.component.html',
  styleUrls: ['./direct-messages-section.component.scss']
})
export class DirectMessagesSectionComponent implements OnInit {
  allUsers: User[] = [];
  allChats: any[] = [];
  collapsed: boolean = false;
  sidenavOpen: boolean = true;
  chatIds: Array<string> = [];
  currentUserId: any;

  // Subscriptions
  // chatSub!: Subscription;
  userSub!: Subscription;

  constructor(
    private userService: UserService,
    public chatService: ChatService,
    private sidenavService: SidenavService,
  ) {
    //this.currentUserId = this.userService.currentUser;
    // this.getCurrentUserChats();
  }

  async ngOnInit(): Promise<void> {
    this.allUsers = await this.getAllUsers();
    await this.getCurrentUserId();
  }


  ngOnDestroy(): void {}

  async getAllUsers() {
    const allUsers: any = [];
    const qSnap = await this.userService.getAllUsersSnapshot();
    qSnap.forEach((doc) => {
      allUsers.push(doc.data());
    });
    return allUsers;
  }

  /**
   * Get current logged in user id from UserServie
  */
  async getCurrentUserId() {
    await this.userService.getCurrentUser()
    .then((currentUserId) => {
      this.currentUserId = currentUserId;
      })
  }


  setNameFirstUser(memberId: string) {
    let index = memberId[0] === this.currentUserId ? 1 : 0;
    let name: string = '';

    this.allUsers.forEach((user: any) => {
      if (user.userId === memberId[index]) {
        name = user.displayName
      }
    });
    return name;
  }

  /**
   * get the profile picture of the user
   * @param userId as string
   * @returns the profile image url of the user
   */
  getChatUserImage(memberId: string) {
    let index = memberId[0] === this.currentUserId ? 1 : 0;
    let img = '';

    this.allUsers.forEach((user: any) => {
      if (user.userId === memberId[index]) {
        img = user.profilePicture
      }
    });
    return img;
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  /**
   * toggle the sidenav if the screen size is less than 768px
   */
  toggleSidenav() {
    if (window.innerWidth < 768) {
      this.sidenavService.openSidenav.emit(!this.sidenavOpen);
    }
  }

}
