db.user.find();

db.book.find();

db.book.find({documentName: 'test'});

db.book.update({documentName: 'test'}, 
    {
        $set: {
            processingPage: 50,
            totalPages: 200, 
            processStatus: 'PROCESSING'
            }
     }, 
{upsert: true});