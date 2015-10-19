import React from 'react';
import { Link } from 'react-router';

import Card from '../Card';
import Text from '../Text';
import Button from '../Button';

export default class AssetCard extends React.Component {

  static propTypes = {
    asset: React.PropTypes.object.isRequired,
  }

  _getBackground(asset) {
    if (asset.category === 'image') {
      return {
        backgroundImage: 'url(/api/assets/' + asset.id + '/download)',
        backgroundSize: 'cover',
      };
    }

    if (asset.category === 'audio') {
      return {
        backgroundImage: 'url(/assets/audio.png)',
        backgroundSize: 'cover',
      };
    }
  }

  render() {
    const asset = this.props.asset;

    return (
      <Card className="asset-card" style={ this._getBackground(asset) }>
        <Link className="asset-card-link" to={`/assets/${asset.id}`} />
        <Text block className="asset-card-title">{ asset.title }
          <Text size="tiny" padding="base">{ asset.category }</Text>
        </Text>
        <Button type="default" size="small" className="asset-download">
          <a href={`/api/assets/${asset.id}/download`} target="_blank" download={asset.title}>Download</a>
        </Button>
      </Card>
    );
  }
}
