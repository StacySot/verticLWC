import { LightningElement, api, wire, track} from 'lwc';
import getContact from '@salesforce/apex/VerticLwcController.getContact';
import deleteContacts from '@salesforce/apex/VerticLwcController.deleteContacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const DELAY = 200;
export default class verticLwc extends LightningElement {
    
    aContact;
    name = '';
    _wiredContacts

    @wire(getContact, { name: '$name'})
 
    wireContact(result) {

        const { error, data } = result;
        if (data) {
            this.aContact = data;
        }
        else if (error) {
            console.debug ('error, something with database.');
            this.error = error;
        }
    }

    filterName (event) {
        window.clearTimeout(this.delay)
        this.delay - setTimeout(() => {
            this.name = this.template.querySelector('[data-element="search"]').value;
        }, DELAY);
    }
    
    @track error;
    deleteContact(event) {
        
        //const contactFromList = event.detail;
        //this._contactFromList = contactFromList;

            deleteContacts({
                id : this._contactFromList
            })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is Delete',
                        variant: 'success',
                    }),
                );
                refreshApex(this._wiredContacts);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error.',
                        message: 'Error on contact delete.',
                        variant: 'error',
                    }),
                );
            });
    }
    
    renderContact(event) {
        const contactFromList = event.detail;
        this._contactFromList = contactFromList;
        this.template.querySelector('c-vertic-list').show();
    }
    @track createPopUp = false;
    newContact(){
        this.template.querySelector('c-vertic-list').show;
    }
}