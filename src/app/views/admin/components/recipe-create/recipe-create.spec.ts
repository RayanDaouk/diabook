import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCreate } from './recipe-create';

describe('RecipeCreate', () => {
  let component: RecipeCreate;
  let fixture: ComponentFixture<RecipeCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
