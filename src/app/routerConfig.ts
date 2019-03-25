import {Routes} from '@angular/router';
import {CreateComponent} from '../app/Patients/create/create.component';
import {EditComponent} from '../app/Patients/edit/edit.component';
import {IndexComponent} from '../app/Patients/index/index.component';
import {HomeIndexComponent} from '../app/Home/home-index/home-index.component';
import { ContactComponent } from './Home/contact/contact.component';
import { AboutComponent } from './Home/about/about.component';
export const appRoutes: Routes = [
{path: 'Patients/Create',
component: CreateComponent
},
{path: 'Patients/Edit/:id',
component: EditComponent
},
{path: 'patients',
component: IndexComponent
},
{path: '',
component: HomeIndexComponent
},
{path: 'Contact',
component: ContactComponent
},
{path: 'About',
component: AboutComponent
},
];
