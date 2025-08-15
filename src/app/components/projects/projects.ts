import { Component } from '@angular/core';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  projects: Project[] = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Eine moderne, responsive Portfolio-Website entwickelt mit Angular. Zeigt meine Fähigkeiten und Projekte in einem ansprechenden Design.',
      technologies: ['HTML', 'SCSS', 'TypeScript', 'Angular', 'Web Development'],
      imageUrl: 'assets/portfolio.png',
      githubUrl: 'https://github.com/Alexander44566/portfolio',
      liveUrl: 'https://alexander44566.github.io/portfolio/',
      featured: true
    },
    {
      id: 2,
      title: 'Backen Einfach Erklärt',
      description: 'Eine umfassende Website rund ums Thema Backen mit Rezepten, Tipps und Anleitungen. Entwickelt für Backbegeisterte aller Erfahrungsstufen.',
      technologies: ['HTML', 'SCSS', 'JavaScript', 'Web Development'],
      imageUrl: 'assets/website.png',
      githubUrl: 'https://github.com/Alexander44566/backen-einfach-erklaert.de/tree/main-V2',
      liveUrl: 'https://backen-einfach-erklaert.de/Home',
      featured: true
    }
  ];

  get featuredProjects() {
    return this.projects.filter(project => project.featured);
  }

  get otherProjects() {
    return this.projects.filter(project => !project.featured);
  }
}
