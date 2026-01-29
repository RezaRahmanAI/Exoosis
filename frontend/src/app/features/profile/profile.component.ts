import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Address, User } from '../../core/models/entities';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: User | null = null;
  address: Address = {};
  message = '';
  error = '';
  imagePreview = '';

  constructor(private authService: AuthService) {
    const current = this.authService.getCurrentUser();
    if (current) {
      this.user = { ...current };
      this.address = { ...current.address };
      this.imagePreview = current.profilePhotoUrl || '';
    }
  }

  onFileChange(event: Event) {
    this.error = '';
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) {
      return;
    }
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.error = 'Only JPG, PNG, or WebP images are allowed.';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.error = 'Image must be under 2MB.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  save() {
    this.message = '';
    this.error = '';
    if (!this.user) {
      this.error = 'Please log in to edit your profile.';
      return;
    }
    if (!this.user.fullName || !this.user.email) {
      this.error = 'Full name and email are required.';
      return;
    }
    const updatedUser: User = {
      ...this.user,
      address: this.address,
      profilePhotoUrl: this.imagePreview || this.user.profilePhotoUrl
    };
    this.authService.updateProfile(updatedUser).subscribe({
      next: user => {
        this.user = { ...user };
        this.message = 'Profile updated successfully.';
      },
      error: () => {
        this.error = 'Unable to update profile.';
      }
    });
  }
}
