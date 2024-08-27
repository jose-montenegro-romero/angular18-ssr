import {
  CommonModule,
  NgOptimizedImage,
  isPlatformBrowser,
} from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { IArtist } from '@models/artist';
// Services
import { HomeService } from '@services/home.service';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss',
})
export class ArtistDetailComponent {
  public artist: IArtist = {
    images: [],
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {
    // afterNextRender(() => {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (isPlatformBrowser(this.platformId)) {
      this.getArtist(id);
    }

    // });
  }

  getArtist(id: string) {
    this.homeService.getArtistApi(id).subscribe((data: IArtist) => {
      this.artist = data;
    });
  }
}
