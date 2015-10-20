import React from 'react';
import { Link } from 'react-router';

import Card from '../Card';
import Text from '../Text';
import Button from '../Button';
import LikeButton from '../LikeButton';
import Modal from '../Modal';
import LikeList from '../../views/LikeList';

export default class AssetCard extends React.Component {

  static propTypes = {
    asset: React.PropTypes.object.isRequired,
    liked: React.PropTypes.bool,
    onLikeChange: React.PropTypes.func,
  }

  state = {}

  _getBackground(asset) {
    if (asset.category === 'image') {
      return {
        backgroundImage: 'url(/api/assets/' + asset.id + '/download)',
        backgroundSize: 'cover',
      };
    }

    if (asset.category === 'audio') {
      return {
        backgroundImage: 'url(/static/audio.png)',
        backgroundSize: 'cover',
      };
    }
  }

  _handleLikeClick = () => {
    if (this.props.onLikeChange) {
      this.props.onLikeChange(!this.props.asset.isLiked);
    }
  }

  _handleLikeListClick = () => {
    this.setState({ showLikeList: true });
  }

  _handleLikeListClose = () => {
    this.setState({ showLikeList: false });
  }

  renderLikeListModal() {
    if (!this.state.showLikeList) {
      return null;
    }

    const asset = this.props.asset;

    return (
      <Modal onClose={ this._handleLikeListClose }>
        <LikeList assetId={ asset.id } />
      </Modal>
    );
  }

  render() {
    const asset = this.props.asset;

    return (
      <Card className="asset-card" style={ this._getBackground(asset) }>
        <Link className="asset-card-link" to={`/assets/${asset.id}`} />
        <Text block className="asset-card-title">{ asset.title }
          <Text size="tiny" padding="base">{ asset.category }</Text>
          <div className="asset-card-liked-by">
            <Button type="flat" onClick={ this._handleLikeListClick } >
              { asset.likedByCount } liked this
            </Button>
          </div>
        </Text>
        <Button type="default" size="small" className="asset-download">
          <a href={`/api/assets/${asset.id}/download`} target="_blank" download={asset.title}>Download</a>
        </Button>
        <LikeButton className="asset-card-like" liked={ this.props.asset.isLiked } onClick={ this._handleLikeClick }/>

        { this.renderLikeListModal() }
      </Card>
    );
  }
}
