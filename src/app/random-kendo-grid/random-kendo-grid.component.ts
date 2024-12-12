import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  GridDataResult,
  PageChangeEvent,
  RowClassArgs,
  SelectableSettings,
  SortSettings,
} from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';

interface GridItem {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  created: Date;
  emergencyLevel: 'None' | 'Small' | 'Medium' | 'High';
  hasNotesToBeRead: boolean;
  folderStatus:
    | 'New'
    | 'Open'
    | 'Sleeping'
    | 'ActionNeeded'
    | 'Late'
    | 'Closed';
  legacyId: string;
  legacyRef: string;
  informexNumber: string;
  mandataryFullName: string;
  policyNumber: string;
  sinisterNumber: string;
  sinisterDate: Date;
  missionDate: Date;
  appointmentDate: Date;
  brokerFullName: string;
  repairerFullName: string;
  aggrievedFullName: string;
  folderManagerFullName: string;
  vehiclePlateNumber: string;
  daysSinceLastModification: number;
  expertiseType: string;
  isVehicleImmobilised: boolean;
  hasPhotos: boolean;
  fileOutcome: 'TotalLoss' | 'Repair' | 'ParallelStudy';
}

enum EmergencyLevel {
  None = 'None',
  Small = 'Small',
  Medium = 'Medium',
  High = 'High',
}

enum FolderStatus {
  New = 'New',
  Open = 'Open',
  Sleeping = 'Sleeping',
  ActionNeeded = 'ActionNeeded',
  Late = 'Late',
  Closed = 'Closed',
}

enum FileOutcomeType {
  TotalLoss = 'TotalLoss',
  Repair = 'Repair',
  ParallelStudy = 'ParallelStudy',
}

@Component({
  selector: 'app-random-kendo-grid',
  templateUrl: './random-kendo-grid.component.html',
  styleUrls: ['./random-kendo-grid.component.scss'],
})
export class RandomKendoGridComponent implements OnInit {
  @Output() destroy = new EventEmitter<void>();

  public gridView: GridItem[] = [];
  public heightWindow = 600;
  public rowHeight = 40;
  public pageSize = 20;
  public skip = 0;
  public sort: SortDescriptor[] = [];
  public showGrid = true;
  public selectedFolderHeader: GridItem | null = null;
  public isLoading = false;
  public filterValue = '';
  public now = new Date();

  public emergencyLevel = EmergencyLevel;
  public folderStatus = FolderStatus;
  public fileOutcomeType = FileOutcomeType;

  public sortSettings: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };

  public selectableSettings: SelectableSettings = {
    checkboxOnly: false,
    mode: 'multiple',
  };

  constructor() {
    this.generateRandomData();
  }

  ngOnInit(): void {}

  private generateRandomData(): void {
    const companies = ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta'];
    const statuses = Object.values(FolderStatus);
    const emergencyLevels = Object.values(EmergencyLevel);
    const fileOutcomes = Object.values(FileOutcomeType);
    const expertiseTypes = ['Standard', 'Premium', 'Express', 'Basic'];

    this.gridView = Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      company: companies[Math.floor(Math.random() * companies.length)],
      phone: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(
        Math.random() * 1000
      )}-${Math.floor(Math.random() * 10000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      created: new Date(
        Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
      ),
      emergencyLevel:
        emergencyLevels[Math.floor(Math.random() * emergencyLevels.length)],
      hasNotesToBeRead: Math.random() > 0.7,
      folderStatus: statuses[Math.floor(Math.random() * statuses.length)],
      legacyId: `L${Math.floor(Math.random() * 10000)}`,
      legacyRef: `REF-${Math.floor(Math.random() * 100000)}`,
      informexNumber: `INF-${Math.floor(Math.random() * 100000)}`,
      mandataryFullName: `Company ${Math.floor(Math.random() * 100)}`,
      policyNumber: `POL-${Math.floor(Math.random() * 100000)}`,
      sinisterNumber: `SIN-${Math.floor(Math.random() * 100000)}`,
      sinisterDate: new Date(
        Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
      ),
      missionDate: new Date(
        Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ),
      appointmentDate: new Date(
        Date.now() + Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
      ),
      brokerFullName: `Broker ${Math.floor(Math.random() * 50)}`,
      repairerFullName: `Repairer ${Math.floor(Math.random() * 50)}`,
      aggrievedFullName: `Aggrieved ${Math.floor(Math.random() * 100)}`,
      folderManagerFullName: `Manager ${Math.floor(Math.random() * 20)}`,
      vehiclePlateNumber: `${Math.random()
        .toString(36)
        .substring(2, 5)
        .toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      daysSinceLastModification: Math.floor(Math.random() * 100),
      expertiseType:
        expertiseTypes[Math.floor(Math.random() * expertiseTypes.length)],
      isVehicleImmobilised: Math.random() > 0.7,
      hasPhotos: Math.random() > 0.5,
      fileOutcome:
        fileOutcomes[Math.floor(Math.random() * fileOutcomes.length)],
    }));
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }

  public onSelectionChange(event: any): void {
    this.selectedFolderHeader = event.selectedRows[0]?.dataItem || null;
  }

  public rowCallBack(context: RowClassArgs): string {
    return context.dataItem.status === 'Inactive' ? 'inactive-row' : '';
  }

  public isRowSelected = (e: any) => false;

  public recreateGrid(): void {
    this.showGrid = false;
    this.gridView = [];
    this.generateRandomData();
    this.showGrid = true;
  }

  public closeGrid(): void {
    this.destroy.emit();
  }

  public onValueFilterChange(value: string): void {
    this.filterValue = value;
    // Implement filter logic here if needed
  }

  public getDaysSinceLastModificationClass(days: number): string {
    if (days <= 30) return 'text-success';
    if (days <= 60) return 'text-warning';
    return 'text-danger';
  }
}
