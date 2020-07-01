@isTest 
public class VerticLwcControllerTest {

    @TestSetup
    static void testSetup() {

        Contact verticContact = new Contact();
        verticContact.FirstName = 'Stacy';
        verticContact.LastName = 'Sotnichenko';
        insert verticContact;

        Contact verticContact2 = new Contact();
        verticContact2.FirstName = 'Mary';
        verticContact2.LastName = 'Sotnichenko';
        insert verticContact2;

    }

    @isTest 
    static void test_getContact_PositiveName() {
        
        Test.startTest();
        List<Contact> verticContact = VerticLwcController.getContact('Stacy');
        Test.stopTest();
        
        System.assert(verticContact.size() == 1, 'Size must be 1. Contact list should correspond to WHERE clause of SOQL.');
    }

    @isTest 
    static void test_getContact_PositiveNull() {
        
        Test.startTest();
        List<Contact> verticContact = VerticLwcController.getContact('');
        Test.stopTest();
        
        System.assert(verticContact.size() == 2, 'Size must be 2. Contact list should correspond to WHERE clause of SOQL.');
    }

    @isTest 
    static void test_getContact_Negative() {
        
        Test.startTest();
        List<Contact> verticContact = VerticLwcController.getContact('Barb');
        Test.stopTest();

        System.assert(verticContact.size() == 0, 'Size must be 0. Contact list should correspond to WHERE clause of SOQL.');
    }

}