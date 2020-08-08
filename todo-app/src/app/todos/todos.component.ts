import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo'
import { from } from 'rxjs';
import { TODOS } from '../mock-todos'
import { TodoService } from '../todo.service'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  todos : Todo[];
  selectedTodo: Todo;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }
  // todo: Todo = {
  //   todo_title: "First Todo",
  //   todo_description: "First Todo  Description"
  // }
  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }
  
  
  onSelect(todo: Todo) : void {
    this.selectedTodo = todo;
  }
}
