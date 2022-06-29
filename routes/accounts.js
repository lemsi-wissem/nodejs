var express = require('express');
var router = express.Router();

var Account = require('../models/account');

router.post('/', function(req, res, next) {
    var account = new Account({
        Name: req.body.Name,
        Iban: req.body.Iban,
        Expiry: req.body.Expiry,
        IdentityPhoto: req.body.IdentityPhoto
    });
    account.save(function(err, account) {
        if (err) {
            return next(err);
        }
        res.json(account);
    });
}
);

router.route('/add')
.get(function(req, res, next) {
    res.render('add.twig', {
        title: 'Add Account'
        });
}
)
.post(function(req, res, next) {
    var account = new Account({
        Name: req.body.Name,
        Iban: req.body.Iban,
        Expiry: req.body.Expiry,
        IdentityPhoto: req.body.IdentityPhoto
    });
    account.save(function(err, account) {
        if (err) {
            return next(err);
        }
        res.json(account);
    });
}
);

router.get('/list', function(req, res, next) {
    Account.find(
    (err, accounts) => {
    res.render('list.twig', { 
    title :"Account list", 
    cont :accounts
    });
    });
});

router.get('/:id', function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {
        if (err) {
            return next(err);
        }
        res.render('details.twig', { 
            title :"Account details",
            cont :account
            });
    });
}
);

router.route('/:id/edit')
.get(function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {
        if (err) {
            return next(err);
        }
        res.render('edit.twig', {
            title: 'Edit Account',
            cont: account
        });
    });
}
)
.post(function(req, res, next) {
    Account.findById(req.params.id, function(err, account) {
        if (err) {
            return next(err);
        }
        account.Name = req.body.Name;
        account.Iban = req.body.Iban;
        account.Expiry = req.body.Expiry;
        account.save(function(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/accounts/list');
        });
    });
}
);

router.get('/delete/:id', function(req, res, next) {
    Account.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/accounts/list');
    });
}
);

module.exports = router;