<script type="text/ng-template" id="self-service-remove-contact-ng2-template">        
    <div class="lightbox-container">
        <h3><@orcid.msg 'manage_consortium.remove_contact_confirm_heading'/></h3>
        <p><@orcid.msg 'manage_consortium.remove_contact_confirm_text1'/></p>
        <p> {{contact?.name}} ({{contact?.id}})</p>
        <form (submit)="removeContact(contact)">
            <button class="btn btn-danger"><@orcid.msg 'manage_consortium.remove_contact_confirm_btn'/></button>
            <a href="" (click)="closeModal()" class="cancel-option"><@orcid.msg 'freemarker.btncancel'/></a>
        </form>
        <div *ngIf="errors?.length === 0">
            <br>
        </div>
    </div>
</script>