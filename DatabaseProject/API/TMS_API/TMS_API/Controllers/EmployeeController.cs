﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using MySql.Data;
using MySql.Data.MySqlClient;
using TMS_API.Attributes;
using TMS_API.Services;

namespace TMS_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private ConnectionService _connectionService = new ConnectionService();

        [Route("{searchName}")]
        [Authorization]
        [HttpGet]
        public IEnumerable<Employee> GetUsersByName(string searchName)
        {
            string query;
            MySqlCommand cmd;

            _connectionService.Connect();
            if (searchName == null)
            {
                query = "SELECT name_fist, name_last, occupation, email FROM employee";
                cmd = new MySqlCommand(query, _connectionService.Connection);

                using MySqlDataReader rdr1 = cmd.ExecuteReader();

                List<Employee> employee1 = new List<Employee>();

                while (rdr1.Read())
                {
                    employee1.Add(new Employee(rdr1.GetString(0), rdr1.GetString(1), rdr1.GetString(2), rdr1.GetString(3)));
                }

                return employee1;
            }

            query = "SELECT name_first, name_last, occupation, email FROM employee WHERE name_last = @lastName";
            cmd = new MySqlCommand(query, _connectionService.Connection);
            cmd.Parameters.Add("@lastName", MySqlDbType.VarChar, 20).Value = searchName;

            using MySqlDataReader rdr = cmd.ExecuteReader();

            List<Employee> employee = new List<Employee>();

            while (rdr.Read())
            {
                employee.Add(new Employee(rdr.GetString(0), rdr.GetString(1), rdr.GetString(2), rdr.GetString(3)));
            }

            return employee;
        }
    }
}