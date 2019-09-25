# divineblue-customerManagment
A simple express app for divineBlue's Customer managment.

database used: mySql
database name: bookdb
table name: divinedb
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| srno       | int(11)      | NO   | PRI | NULL    | auto_increment |
| compname   | varchar(220) | NO   |     | NULL    |                |
| clientname | varchar(220) | NO   |     | NULL    |                |
| reference  | varchar(220) | YES  |     | NULL    |                |
| email      | varchar(340) | YES  |     | NULL    |                |
| standard   | varchar(220) | YES  |     | NULL    |                |
| certno     | varchar(220) | YES  |     | NULL    |                |
| issuedate  | date         | YES  |     | NULL    |                |
| surv1      | date         | YES  |     | NULL    |                |
| surv2      | date         | YES  |     | NULL    |                |
| certexp    | date         | YES  |     | NULL    |                |
| country    | varchar(220) | YES  |     | NULL    |                |
| cb         | varchar(220) | YES  |     | NULL    |                |
| contact    | bigint(20)   | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
