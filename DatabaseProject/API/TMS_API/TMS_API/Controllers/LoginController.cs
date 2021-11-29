﻿using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using TMS_API.Models;
using TMS_API.Utilities;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private static MySqlConnection Connection = new MySqlConnection("server=173.90.136.43;user=brandon;database=tms;port=3306;password=P@ssw0rd");

        [HttpPost]
        public LoginResponse Login(LoginInformation request)
        {
            Connection.Open();

            string query = "SELECT * FROM login_information WHERE username = @user LIMIT 1";
            MySqlCommand cmd = new MySqlCommand(query, Connection);
            cmd.Parameters.Add("@user", MySqlDbType.VarChar, 45).Value = request.Username;

            cmd.ExecuteNonQuery();

            using MySqlDataReader rdr = cmd.ExecuteReader();
            LoginInformation dbLoginInfo = null;

            if (rdr.Read())
            {
                string isManager = rdr.GetString(3);
                dbLoginInfo = new LoginInformation(rdr.GetString(0), rdr.GetString(1), rdr.GetString(2), isManager == "1" ? true : false);
            }

            if (dbLoginInfo == null)
            {
                Console.WriteLine("User not found");
                Connection.Close();
                return new LoginResponse("Invalid Username or Password.", "", "", false, "");
            }

            if (PasswordHashing.Compare(request.Password, dbLoginInfo.Password))
            {
                string token = TokenHelper.generateJwtToken(dbLoginInfo.EmployeeID);
                Connection.Close();
                return new LoginResponse("Success!", dbLoginInfo.Username, dbLoginInfo.EmployeeID, dbLoginInfo.IsManager, token);
            }

            Connection.Close();
            return new LoginResponse("Invalid Username or Password.", "", "", false, "");
        }
    }
}
