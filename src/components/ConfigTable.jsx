import React, {useState} from 'react'
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ConfigEditModal from './ConfigEditModal'
import ConfigDeleteModal from './ConfigDeleteModal'

const useStyles = makeStyles({
    tables: {
        marginTop: '5vw',
        height: 'auto',
        width: '100%',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    buttons: {
        width: '250px',
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const columns = [
    {
        field: 'id',
        headerName: 'ID',
    },
    {
        field: 'name',
        headerName: 'Descrição',
    },
    {
        field: 'buttons',
        headerName: 'Ações',
    },
]

const MessagesTable = (props) => {
    const {config, type} = props
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, config.length - page * rowsPerPage)


    /*** MODAL EXCLUSAO ***/
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [configModalDelete, setConfigModalDelete] = useState('')

    const handleOpenModalDelete = (message) => {
        setConfigModalDelete(message)
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false)
    }

    /*** MODAL EDICAO ***/
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [configModalEdit, setConfigModalEdit] = useState('')

    const handleOpenModalEdit = (message) => {
        setConfigModalEdit(message)
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setOpenModalEdit(false)
    }

    return (
        <>
            <TableContainer className={classes.tables}
                            component={Paper}>
                <Table aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => {
                                return <TableCell key={column.field}
                                                  id={column.field}>{column.headerName}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {config
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <div className={classes.buttons}>
                                            <Button variant='contained'
                                                    color='default'
                                                    onClick={() => handleOpenModalEdit(item)}
                                                    startIcon={<EditIcon />}>
                                                Editar
                                            </Button>
                                            <Button variant='contained'
                                                    onClick={() => handleOpenModalDelete(item)}
                                                    color='secondary'
                                                    startIcon={<DeleteForeverIcon />}>
                                                Excluir
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 69 * emptyRows}}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className={classes.pagination}>
                    <TablePagination
                        component='tr'
                        count={config.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </div>
            </TableContainer>
            {openModalEdit &&
            <ConfigEditModal open={openModalEdit}
                             fetch={props.fetch}
                             setOpen={setOpenModalEdit}
                             item={configModalEdit}
                             type={type}
                             handleClose={handleCloseModalEdit} />}
            {openModalDelete &&
            <ConfigDeleteModal open={openModalDelete}
                             fetch={props.fetch}
                             item={configModalDelete}
                             type={type}
                             handleClose={handleCloseModalDelete} />}
        </>
    )
}

export default MessagesTable
