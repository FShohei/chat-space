require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }
#letメソッド＝複数のexampleで同一のインスタンスを使用したい時
  describe '#index' do

    context 'log in' do
      before do #共通の処理を書くindexアクションのリクエストを行う
        login user #getメソッド＝擬似的にindexアクションを動かすリクエストを行う
        get :index, params: { group_id: group.id }
      end  #contextを使用して、機能している場合＆機能してない場合

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        expect(response).to render_template :index
      end
    end  #ログインしている場合

    context 'not log in' do
      before do #共通の処理をかく
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end    #ログインしていない場合
  end
      #メッセージを作成するアクションのテスト
  describe '#create' do
  let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

  context 'log in' do
    before do
      login user
    end
    #ログインしている＆保存に成功した場合
    context 'can save' do
      subject {
        post :create,  #postメソッドでcreateアクションを擬似的にリクエスト
        params: params
      }

      it 'count up message' do
        expect{ subject }.to change(Message, :count).by(1)
      end  #messageモデルのレコードの総数が1個増えたかどうか

      it 'redirects to group_messages_path' do
        subject
        expect(response).to redirect_to(group_messages_path(group))
      end  #意図した画面に移動しているかどうか
    end
     #ログイン＆保存に失敗した場合
    context 'can not save' do
      let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

      subject {
        post :create,
        params: invalid_params
      }

      it 'does not count up' do
        expect{ subject }.not_to change(Message, :count)
      end
     #not_to〜できないこと
      it 'renders index' do
        subject
        expect(response).to render_template :index
      end
    end  #保存に失敗した場合renderアクションのビューを設定しているので
  end
  #非ログイン時
  context 'not log in' do

    it 'redirects to new_user_session_path' do
      post :create, params: params
      expect(response).to redirect_to(new_user_session_path)
    end
  end
end
end

end

