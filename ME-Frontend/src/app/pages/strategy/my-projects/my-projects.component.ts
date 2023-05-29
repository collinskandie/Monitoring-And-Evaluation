import { Component, OnInit } from '@angular/core';
import { RegisterNewProjectComponent } from "../projects/register-new-project/register-new-project.component";
import { Router } from '@angular/router';

import {
  NbComponentStatus,
  NbDialogService,
  NbSortDirection,
  NbSortRequest,
  NbToastrService,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { StrategyService } from "../../../services/strategy-service";

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  createdBy: string;
  projectId?: string;
  link?: string
  items?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
}

@Component({
  selector: 'ngx-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  selectedProject: string
  customColumn = "name";
  defaultColumns = [
    "size",
    "kind",
    "items",
    "createdBy",
    "start date",
    "end date",
    "status",
    "link"
  ];
  showDetails: boolean = false;
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  names: string[] = [];


  constructor(
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private dialogService: NbDialogService,
    private toasterService: NbToastrService,
    private strategyService: StrategyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem("userId");
    this.strategyService.getMyStrategy(user).subscribe((strategies) => {
      let strategyData = strategies.map((strategy) => {
        return {
          data: {
            name: strategy.name,
            size: "1.8 MB",
            items: 5,
            kind: "strategy",
            createdBy: strategy.createdBy,
          },
          children: strategy.projects.length !== 0 ?
            strategy.projects.map((project) => {

              return {
                data: {
                  name: project.name,
                  kind: "project",
                  size: "240 KB",
                  createdBy: project.createdBy,
                  link: 'link',
                  projectId: project._id
                },
                children: project.subProjects.length !== 0 ?
                  project.subProjects.map((task) => {

                    return {
                      data: {
                        name: task.name,
                        kind: "project",
                        size: "240 KB",
                        createdBy: "Jackson Omollo",
                      },
                    };
                  })
                  : [{
                    data: {
                      name: 'No Existing Tasks',
                      kind: "",
                      size: "",
                      createdBy: "",
                    },
                  }],
              };
            })
            : [{
              data: {
                name: 'No Existing Projects',
                kind: "",
                size: "",
                createdBy: "",
              },
            }],
        };
      });
      this.data = strategyData;
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[];

  open() {
    this.dialogService
      .open(RegisterNewProjectComponent)
      .onClose.subscribe((data) => {
        if (data.type === "success") {
          this.toasterService.show("", `Successful Project Registration`, {
            status: "success",
          });
        }
        this.ngOnInit()
      });
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }
}


// @Component({
//   selector: "nb-fs-icon",
//   template: `
//     <nb-tree-grid-row-toggle
//       [expanded]="expanded"
//       *ngIf="isDir(); else fileIcon"
//     >
//     </nb-tree-grid-row-toggle>
//     <ng-template #fileIcon>
//       <nb-icon icon="file-text-outline"></nb-icon>
//     </ng-template>
//   `,
// })
// export class FsIconComponent {
//   @Input() kind: string;
//   @Input() expanded: boolean;

//   isDir(): boolean {
//     return this.kind === "dir";
//   }
// }


