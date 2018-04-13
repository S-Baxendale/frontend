import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import compose from 'lodash/fp/compose'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import '../../styles/Product.css'
import OrderForm from './../OrderForm'
import Dialog, { DialogActions, DialogContent, DialogContentText,  DialogTitle } from 'material-ui/Dialog'
import '../../styles/Product.css'
import { fetchProduct } from '../../actions/products'
import { createOrder } from '../../actions/orders'
import ProductForm from './ProductForm'

const styles = {
  dialog: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  }
}


class Product extends PureComponent {

  state = {
    newOrder: false,
    confirmOrder: false,
    editProduct: false
  }

  componentWillMount(props) {
    this.props.fetchProduct(this.props.match.params.id)
  }

  handleClickOrderOpen = () => {
    this.setState({ newOrder: true });
  };

  handleOrderClose = () => {
    this.setState({ newOrder: false });
  };

  handleConfirmOpen = () => {
    this.setState({ confirmOrder: true })
  }

  handleConfirmClose = () => {
    this.setState({ confirmOrder: false })
  }

  handleEditOpen = () => {
    this.setState({ editProduct: true });
  };

  handleEditClose = () => {
    this.setState({ editProduct: false });
  };

  createOrder = (order, productId, buyer) => {
    this.props.createOrder(order, this.props.match.params.id, this.props.currentUser)
    this.handleOrderClose()
    this.handleConfirmOpen()
  }

  render() {
    const { classes, product, currentUser } = this.props
    if (!product) return null

    return(
      <div className="product-container">
        <Paper className="paper">
        <Paper className="title"><h2>{ product.name }</h2></Paper>
          <Grid container className="container">

            <Grid item>
              <img src={ product.photo } className="product-photo"/>
              <p>Code: { product.code }</p>
              <p>Harvested Dated: { product.harvested }</p>
              <p>Expiration Date: { product.expiration }</p>

              <Link to={ `/profiles/${product.seller.id}` }>
                <Button color="primary">
                  View Seller
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <p>{ product.description }</p>
              <p>Volume: { product.volume } KG</p>
              <p>Price: { product.price } { product.currency } per KG</p>
              <p>Certification: { product.certificate }</p>
              <p>Country { product.seller.country }</p>
              <p>City/Port: { product.seller.city }</p>

              <Button onClick={ this.handleEditOpen }>Edit Product</Button>

              <Button onClick={this.handleClickOrderOpen}>Make New Order</Button>
            </Grid>


            <Dialog
              open={this.state.editProduct}
              onClose={this.handleEditClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Your Product</DialogTitle>
                <ProductForm inititalValues={ product } onSubmit={ this.updateProduct }/>
            </Dialog>

            <Dialog
              open={this.state.newOrder}
              onClose={this.handleOrderClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Please enter your order</DialogTitle>
                <OrderForm onSubmit={ this.createOrder } class="batch-form"/>
            </Dialog>

            <Dialog
              open={ this.state.confirmOrder }
              onClose={ this.handleConfirmClose }
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Thankyou. Your order has been recieved.</DialogTitle>
            </Dialog>

          </Grid>
        </Paper>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { fetchProduct, createOrder })(Product)