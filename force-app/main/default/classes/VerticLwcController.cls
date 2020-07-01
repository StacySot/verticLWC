public class VerticLwcController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(String name) {

        name = name + '%';
        return [
            SELECT Id, FirstName, LastName, Email, Account.Name, AccountId, MobilePhone, CreatedDate
            FROM Contact
            WHERE Name LIKE :name
            LIMIT 10
        ];
    }

    @AuraEnabled
    public static void deleteContacts(Id id) {
        
        List<Contact> contact = [
            SELECT Id 
            FROM Contact
            WHERE Id = :id
        ];
        
        if(contact.isEmpty()) {
            System.debug('Contact is empty.');
        }

        else {
            try {
                delete contact;
            } catch (Exception exp) {
                System.debug('Error' + exp);
            }
        }
    }

}