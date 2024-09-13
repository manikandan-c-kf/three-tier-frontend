import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-update-dialog',
  templateUrl: './post-update-dialog.component.html',
  styleUrls: ['./post-update-dialog.component.css']
})
export class PostUpdateDialogComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    public dialogRef: MatDialogRef<PostUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postForm = this.fb.group({
      id: [data.id],
      title: [data.title, Validators.required],
      content: [data.content, Validators.required]
    });
  }

  onUpdate(): void {
    if (this.postForm.valid) {
      this.postService.updatePost(this.postForm.value.id, this.postForm.value).subscribe(
        () => {
          this.dialogRef.close(true); // Close dialog and indicate success
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }
}
