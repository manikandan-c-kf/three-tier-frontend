import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.postForm.valid) {
      this.postService.createPost(this.postForm.value).subscribe(
        () => {
          this.postForm.patchValue({
            title: '',
            content: ''
          });
          this.postForm.clearValidators();
          this.postService.notifyPostsUpdate();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }
}
