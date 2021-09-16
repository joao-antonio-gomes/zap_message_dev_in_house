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
import MessagesModal from './MessagesModal'
import InsertCommentIcon from '@material-ui/icons/InsertComment'
import DeleteModal from './DeleteModal'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditModal from './EditModal'

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
        width: '380px',
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const columns = [
    {
        field: 'trigger',
        headerName: 'Gatilho',
    },
    {
        field: 'channel',
        headerName: 'Canal',
    },
    {
        field: 'timer',
        headerName: 'Tempo',
    },
    {
        field: 'created_at',
        headerName: 'Criado em',
    },
    {
        field: 'buttons',
        headerName: 'Ações',
    },
]

const MessagesTable = (props) => {
    const {messages} = props
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
        rowsPerPage - Math.min(rowsPerPage, messages.length - page * rowsPerPage)

    /*** MODAL VISUALIZACAO ***/
    const [openModalView, setOpenModalView] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const handleOpen = (message) => {
        setModalMessage(message)
        setOpenModalView(true)
    }

    const handleClose = () => {
        setOpenModalView(false)
    }

    /*** MODAL EXCLUSAO ***/
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [modalMessageDelete, setModalMessageDelete] = useState('')

    const handleOpenModalDelete = (message) => {
        setModalMessageDelete(message)
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false)
    }

    /*** MODAL EDICAO ***/
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [modalMessageEdit, setModalMessageEdit] = useState('')

    const handleOpenModalEdit = (message) => {
        setModalMessageEdit(message)
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
                        {messages
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((message) => (
                                <TableRow key={message.id}>
                                    <TableCell>{message.trigger}</TableCell>
                                    <TableCell>{message.channel}</TableCell>
                                    <TableCell>{message.timer}</TableCell>
                                    <TableCell>{message.created_at}</TableCell>
                                    <TableCell>
                                        <div className={classes.buttons}>
                                            <Button variant='contained'
                                                    onClick={() => handleOpen(message.message)}
                                                    color='primary'
                                                    startIcon={<InsertCommentIcon />}>
                                                Visualizar
                                            </Button>
                                            <Button variant='contained'
                                                    color='default'
                                                    onClick={() => handleOpenModalEdit(message)}
                                                    startIcon={<EditIcon />}>
                                                Editar
                                            </Button>
                                            <Button variant='contained'
                                                    onClick={() => handleOpenModalDelete(message)}
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
                        count={messages.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </div>
            </TableContainer>
            <MessagesModal open={openModalView}
                           message={modalMessage}
                           handleClose={handleClose} />
            <DeleteModal open={openModalDelete}
                         finishMessageRegister={props.finishMessageRegister}
                         message={modalMessageDelete}
                         handleClose={handleCloseModalDelete} />
            {
                openModalEdit &&
                <EditModal open={openModalEdit}
                           setOpen={setOpenModalEdit}
                           finishMessageRegister={props.finishMessageRegister}
                           handleClose={handleCloseModalEdit}
                           message={modalMessageEdit}/>
            }
        </>
    )
}

export default MessagesTable
