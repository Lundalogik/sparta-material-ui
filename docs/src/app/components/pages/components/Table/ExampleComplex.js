import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
    id: 1,
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
    id: 2,
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
    id: 3,
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
    id: 4,
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
    id: 5,
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
    id: 6,
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
    id: 7,
  },
];

export default class TableExampleComplex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: '300px',
      searchText: '',
      selectedKeys: [],
      filteredUsers: tableData,
    };
  }

  filteredUsers = () => {
    const re = new RegExp(this.state.searchText, 'i');
    const filteredUsers = this.state.searchText ?
      tableData.filter((user) => re.test(`${user.name}`)) : tableData;

    return filteredUsers;
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  handleSearchOnChange = (event) => {
    event.preventDefault();

    this.setState({
      searchText: event.target.value,
    });
  }

  handleRowSelection = (selection) => {
    console.log(selection); // eslint-disable-line no-console

    if (selection === 'all') {
      const temp = [];
      tableData.map((user) => temp.push(user.id));
      const selectedKeys = temp;
      this.setState({
        selectedKeys,
      });

      return;
    } else if (selection === 'none') {
      this.setState({
        selectedKeys: [],
      });

      return;
    }

    const filteredUsers = this.filteredUsers();
    const user = filteredUsers[selection];
    const selectedKeys = this.state.selectedKeys;

    if (selectedKeys.includes(user.id)) {
      selectedKeys.splice(selectedKeys.indexOf(user.id), 1);
    } else {
      selectedKeys.push(user.id);
    }

    this.setState({selectedKeys});
  }

  render() {
    const {selectedKeys} = this.state;

    // console.log(`selected: ${this.state.selectedKeys}`); // eslint-disable-line no-console
    const filteredUsers = this.filteredUsers();
    const selectedUsers = filteredUsers.filter((user) => selectedKeys.includes(user.id));
    const selectedRows = selectedUsers.map((user) => filteredUsers.indexOf(user));
    const allRowsSelected = filteredUsers.length === selectedRows.length;

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          selectedRows={selectedRows}
          allRowsSelected={allRowsSelected}
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
                <TextField
                  hintText={'Filter skelter'}
                  onChange={this.handleSearchOnChange}
                  style={{display: 'block', width: '100%'}}
                />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {filteredUsers.map((user) => {
              // const selected = this.state.selectedKeys.includes(user.id);
              // console.log(`${user.name}: ${selected ? 'true' : 'false'}`); // eslint-disable-line no-console

              return (
                <TableRow
                  key={user.id}
                >
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn>{user.status}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        <div style={styles.propContainer}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this.handleChange}
          />
          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedHeader}
          />
          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this.handleToggle}
            defaultToggled={this.state.fixedFooter}
          />
          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.selectable}
          />
          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this.handleToggle}
            defaultToggled={this.state.multiSelectable}
          />
          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this.handleToggle}
            defaultToggled={this.state.enableSelectAll}
          />
          <h3 style={styles.propToggleHeader}>TableBody Properties</h3>
          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this.handleToggle}
            defaultToggled={this.state.deselectOnClickaway}
          />
          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this.handleToggle}
            defaultToggled={this.state.stripedRows}
          />
          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showRowHover}
          />
          <h3 style={styles.propToggleHeader}>Multiple Properties</h3>
          <Toggle
            name="showCheckboxes"
            label="Show Checkboxes"
            onToggle={this.handleToggle}
            defaultToggled={this.state.showCheckboxes}
          />
        </div>
      </div>
    );
  }
}
