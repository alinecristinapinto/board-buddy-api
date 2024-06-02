export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      Game: {
        Row: {
          available: boolean | null;
          created_at: string;
          description: string | null;
          id: number;
          name: string | null;
          user_id: string | null;
        };
        Insert: {
          available?: boolean | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
          user_id?: string | null;
        };
        Update: {
          available?: boolean | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          name?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Game_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      Loan: {
        Row: {
          created_at: string;
          delivered_at: string | null;
          estimated_delivery_at: string | null;
          game_id: number | null;
          id: number;
          lessee_user_id: string | null;
        };
        Insert: {
          created_at?: string;
          delivered_at?: string | null;
          estimated_delivery_at?: string | null;
          game_id?: number | null;
          id?: number;
          lessee_user_id?: string | null;
        };
        Update: {
          created_at?: string;
          delivered_at?: string | null;
          estimated_delivery_at?: string | null;
          game_id?: number | null;
          id?: number;
          lessee_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Emprestimo_id_jogo_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'Game';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Emprestimo_id_usuario_locatario_fkey';
            columns: ['lessee_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      Penalty: {
        Row: {
          created_at: string;
          loan_id: number;
          payed_at: string | null;
        };
        Insert: {
          created_at?: string;
          loan_id: number;
          payed_at?: string | null;
        };
        Update: {
          created_at?: string;
          loan_id?: number;
          payed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Multa_id_emprestimo_fkey';
            columns: ['loan_id'];
            isOneToOne: true;
            referencedRelation: 'Loan';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
