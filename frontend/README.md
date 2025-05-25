Todo:- 


create frontend for this routes:-

### Get Sellers all purchases

get :- http://localhost:5000/api/purchases/seller/:id

headers :- autorization - barear jwt_token_of_user

### Get eligible sellers to be paid

get :- http://localhost:5000/api/users/monitor/sellers?status=all&eligibleOnly=true&startDate=2025-05-01&endDate=2025-06-30

params:- 
status = unpaid | paid | all,
eligibleOnly = true | false,
startDate=2025-05-01,
endDate=2025-06-30

headers :- autorization - barear jwt_token_of_admin

### Get transactions data of seller for admin
get :- http://localhost:5000/api/purchases/monitor/seller/:seller_user_id/transactions

headers :- autorization - barear jwt_token_of_admin

### Update transation status by admin

patch :- http://localhost:5000/api/purchases/update/:purchase_id

headers :- autorization - barear jwt_token_of_admin

body :- 
{
  "payment_status": true / false
}