import {Component, Input, OnInit} from '@angular/core';
import {NewsService} from '../../../services/news.service';
import {TheNewYorkTimesAPILinks} from '../../../enums/theNewYorkTimesAPILinks';
import {TnytReponseModel} from '../../../models/theNewYourTimesModel/tnytReponseModel';
import {TnytResultsModel} from '../../../models/theNewYourTimesModel/tnytResultsModel';

@Component({
  selector: 'app-new-york-times-news-component',
  templateUrl: './new-york-times-news-component.component.html',
  styleUrls: ['./new-york-times-news-component.component.scss']
})
export class NewYorkTimesNewsComponentComponent implements OnInit {
  @Input() newsCategory;
  paramNewsCategory: TheNewYorkTimesAPILinks;
  newsResults: Array<TnytResultsModel>;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    if (this.newsCategory === 'art-news') {
      this.paramNewsCategory = TheNewYorkTimesAPILinks.TNYT_TOPSTORIES_ARTS;
    }else if (this.newsCategory === 'science-news') {
      this.paramNewsCategory = TheNewYorkTimesAPILinks.TNYT_TOPSTORIES_SCIENCE;
    }else if (this.newsCategory === 'top-news') {
      this.paramNewsCategory = TheNewYorkTimesAPILinks.TNYT_TOPSTORIES_HOME;
    }else if (this.newsCategory === 'world-news') {
      this.paramNewsCategory = TheNewYorkTimesAPILinks.TNYT_TOPSTORIES_WORLD;
    }
    this.newsService.getNewYorkTimesTopNews(this.paramNewsCategory).subscribe( (res: TnytReponseModel) => {
      this.newsResults = res.results.splice(10);
    });
  }
}
