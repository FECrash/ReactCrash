import React, { Component } from 'react'
import ColorContext from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export class SelectColors2 extends Component {
  static contextType = ColorContext;

  handleSetcolor = color => {
    this.context.actions.setColor(color);
  }

  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        <div style={{ display: 'flex' }}>
          {colors.map(color => (
            <div
              key={color}
              style={{
                background: color,
                width: '24px',
                height: '24px',
                cursor: 'pointer'
              }}
              onClick={() => this.handleSetcolor(color)}
              // 오른쪽 클릭 이벤트
              onContextMenu={event => {
                event.preventDefault();
                this.handleSetcolor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    )
  }
}

export default SelectColors2
