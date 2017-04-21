var languages = [{
    lang:'en',
    title: "Shutter Warranty Registration",
    titleDesc: 'Thank you for purchasing Shade-O-Matic Shutters.',
    titleThank: 'Please take a moment to register your product and activate your warranty.',
    order: 'Order / Reference number',
    email: 'Email Address',
    name: 'Full name',
    address1: 'Address',
    address2: 'Address Line 2',
    city: 'City',
    province: 'Province / State',
    postalCode: 'Postal Code / Zip',
    country: 'Country',
    send: 'Register',
    error: 'An error has occurred, please try again later',
    success: 'Thank you for registering your product, a confirmation email has been sent to you.',

    sitemap: 'Site Map',
    products: 'Products',
    contacts: 'Contacts',
    home: 'Home',
    company: 'Company',
    resources: 'Resources',
    dealerLocator: 'Dealer Locator',
    dealerSite: 'Dealer Site',
    contactUs: 'Contact Us',
    blindsAndShades: 'Blinds and Shades',
    shutters: 'Shutters',
    news: 'News for 2017',
    phone: 'Phone',
    fax: 'Fax',
    copyright: 'Copyright',
    copyrightText: 'Shade O Matic, 2017. All rights reserved'
},{
    lang:'fr',
    title: "Enregistrement de la garantie de l'obturateur",
    titleDesc: "Merci d'avoir acheté les volets Shade-O-Matic.",
    titleThank: "Prenez un moment pour enregistrer votre produit et activer votre garantie.",
    order: 'Référence / Commande client',
    email: 'Addresse du couriel',
    name: 'Nom',
    address1: 'Adresse',
    address2: "Adresse Ligne 2",
    city: 'Ville',
    province: 'Province',
    postalCode: 'Code postal',
    country: 'Pays',
    send: 'Registre',
    error: 'Un erreur est survenue, veuillez réessayer plus tard',
    success: "Merci d'avoir enregistré votre produit, un e-mail de confirmation vous a été envoyé",

    sitemap: 'Carte du site',
    products: 'Produits',
    contacts: 'Coordonnées',
    home: 'Accueil',
    company: 'Qui nous sommes',
    resources: 'Ressources',
    dealerLocator: 'Site pour détaillant',
    dealerSite: 'Dealer Site',
    contactUs: 'Comuniquer avec nous',
    blindsAndShades: 'Stores',
    shutters: 'Persiennes',
    news: 'Nouveautés en 2017',
    phone: 'Téléphone',
    fax: 'Télécopieur',
    copyright: 'Droits d’auteur',
    copyrightText: 'Shade O Matic, 2017. Tous droits réservés'
}];

var countries = [{
    name: 'Canada',
    provinces: [{
        province: 'Ontario',
        abbrv: 'ON'
    }, {
        province: 'Quebec',
        abbrv: 'QC'
    }, {
        province: 'British Columbia',
        abbrv: 'BC'
    }, {
        province: 'Alberta',
        abbrv: 'AB'
    }, {
        province: 'Manitoba',
        abbrv: 'MB'
    }, {
        province: 'Saskatchewan',
        abbrv: 'SK'
    }, {
        province: 'Nova Scotia',
        abbrv: 'NS'
    }, {
        province: 'New Brunswick',
        abbrv: 'NB'
    }, {
        province: 'Newfoundland and Labrador',
        abbrv: 'NL'
    }, {
        province: 'Prince Edward Island',
        abbrv: 'PE'
    }, {
        province: 'Northwest Territories',
        abbrv: 'NT'
    }, {
        province: 'Yukon',
        abbrv: 'YT'
    }, {
        province: 'Nunavut',
        abbrv: 'NU'
    }]
},
{
    name: 'United States',
    provinces: [{
        province: 'Other',
        abbrv: 'Other'
    }]
}]

function Warranty() {
    var self = this;

    this.enabled = ko.observable(true);

    this.lang = ko.observable(languages[0]);
    this.order = ko.observable();
    this.name = ko.observable();
    this.email = ko.observable();
    this.address1 = ko.observable();
    this.address2 = ko.observable();
    this.city = ko.observable();
    this.province = ko.observable();
    this.postalCode = ko.observable();
    this.country = ko.observable();
    this.countries = ko.observableArray(countries);

    this.error = ko.observable(false);
    this.success = ko.observable(false);

    this.changeLang = function(lang) {
        //change lang if not set default
        for(var i=0; i<languages.length; i++) {
            if (languages[i].lang === lang) {
                self.lang(languages[i]);
                break;
            }
        }        
    };

    this.send = function() {        
        //Validate form
        if (!$('#form').valid()) {            
            return;
        }

        self.enabled(false);

        var id = {
            order: self.order(),
            fullName: self.name(),
            email: self.email(),
            address1: self.address1(),
            address2: self.address2(),
            city: self.city(),
            province: self.province().province,
            postalCode: self.postalCode(),
            country: self.country().name
        };
        
        $.ajax({
            //'http://warranty.shadeomatic.com/Warranty/Send'
            url: 'http://localhost:28617/api/Warranty/Send/',
            dataType:'text',
            data:JSON.stringify(id),
            type: 'GET'
        }).done(function() {
            self.success(true);
            self.error(false);
        }).fail(function() {
            self.success(false);
            self.error(true);
        }).always(function() {
            self.enabled(true);
            console.log(id);
        });

        //Submit form
        
    }
};

ko.applyBindings(new Warranty());