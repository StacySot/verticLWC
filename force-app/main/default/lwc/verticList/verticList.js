import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class VerticList extends NavigationMixin (LightningElement) {

    @api contact;
    @api recordId;
    @api objectApiName;
    toAccount(event) {
        var accountId = event.target.dataset.accountId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    @track deletePopUp = false;
    OpenDeletePopUp() {
        this.deletePopUp = true
    }
    closeDeletePopUp() {
        this.deletePopUp = false
    }
    YesDeletePopUp(event) {
        const contactId = event.target.dataset.contactId;
        this.dispatchEvent(new CustomEvent('c-vertic-list',{ 
            detal: contactId
        }));
        //this.deletePopUp = false
    }
}