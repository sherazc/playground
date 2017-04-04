
-- all
select * from student_data sd;

select * from student_fee_paid sp;

select * from student_data sd inner join student_fee_paid sp on sd.id = sp.student_id;


select * from student_data sd left join student_fee_paid sp on sd.id = sp.student_id
where sp.fee_date not between '2013-09-01' and '2013-09-31';

select * from student_data sd right join student_fee_paid sp on sd.id = sp.student_id;

-- paid
select * from student_data sd where
	exists (
		select 'x' from student_fee_paid sp where sp.student_id = sd.id
	);


-- Unpaid
select * from student_data sd where
	not exists (
		select 'x' from student_fee_paid sp where fee_date between '2013-09-01' and '2013-09-31' and sp.student_id = sd.id
	);


select * from student_data;

update student_data set phone_number = '1234567890' where id='1';

insert into student_fee_paid (id, fee_paid_amount, student_id, fee_date, dml_date) values (103, 400, 1, '2013-11-04', '2013-11-04');

commit;
