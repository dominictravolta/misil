import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { People } from './people.model';
import { PeoplePopupService } from './people-popup.service';
import { PeopleService } from './people.service';

@Component({
    selector: 'jhi-people-delete-dialog',
    templateUrl: './people-delete-dialog.component.html'
})
export class PeopleDeleteDialogComponent {

    people: People;

    constructor(
        private peopleService: PeopleService,
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.peopleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'peopleListModification',
                content: 'Deleted an people'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('misilApp.people.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-people-delete-popup',
    template: ''
})
export class PeopleDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private peoplePopupService: PeoplePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.peoplePopupService
                .open(PeopleDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
