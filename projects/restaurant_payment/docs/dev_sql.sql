use system_db;
use customer_db;

drop table system_db.flyway_schema_history;
drop table customer_db.flyway_schema_history;

delete from system_db.bank;
delete from system_db.company_user;
delete from system_db.company;
delete from system_db.pricing_plan ;

select * from system_db.company c ;
select * from system_db.company_user cu ;
select * from system_db.bank b ;


